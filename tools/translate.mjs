import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "fs";
import path, { basename, dirname } from "path";
import { createHash } from "crypto";
import dotenv from 'dotenv';
dotenv.config();

// https://cloud.google.com/vertex-ai/generative-ai/docs/translate/translate-text

/**
 * @typedef {"de-DE" | "vn-VN" | "zh-CN" | ({} & string)} Language
 */

/** 
 * @typedef {{filename:string, filepath:string, relpath:string}} LocalFile
 */

translateDocumentation();

/**
 * Parse docs sitemap and translate all pages to different languages. Output is saved to .docs folder.
 * @returns {Promise<void>}
 */
export async function translateDocumentation() {

    /**
     * @type {Partial<Record<Language, string>>}
     */
    const languages = {
        "de-DE": "de", // German
        "vn-VN": "vn", // Vietnamese
        "zh-CN": "zh", // Chinese
        "es-ES": "es", // Spanish
        "fr-FR": "fr", // French
        "hi-IN": "hi", // Hindi
        "ja-JP": "ja", // Japanese
        "po-PT": "pt", // Portuguese
    }

    if (!process.env.GOOGLE_GEMINI_API_KEY) {
        console.error("Can not translate: GOOGLE_GEMINI_API_KEY is not set");
        return;
    }
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-04-17" });

    const startTime = Date.now();
    const files = await getMarkdownFiles(path.resolve("./documentation"), []);

    let aborted = false;
    for (let i = 0; i < files.length; i++) {
        if (aborted) break;
        const sourceFile = files[i];
        const content = readFileSync(sourceFile.filepath, "utf-8");
        const contentMd5 = createHash("md5").update(content).digest("hex");

        console.log(`Translating ${sourceFile.filename} (${content.length} bytes)`);

        /** @type {Array<Promise<void>>} */
        const currentTranslationJobs = [];
        for (const kvp of Object.entries(languages)) {
            if (aborted) break;
            const translatedPath = `${kvp[1]}/${sourceFile.relpath}`;
            const targetPath = path.resolve(`./documentation/lang/${translatedPath}`);
            const hashfilepath = targetPath + ".hash";
            const didTranslateBefore = existsSync(targetPath);
            if (didTranslateBefore) {
                if (existsSync(hashfilepath)) {
                    const hash = readFileSync(hashfilepath, "utf-8");
                    if (hash === contentMd5) {
                        console.log("File already exists and is up to date, skipping translation:", targetPath);
                        continue;
                    }
                }
                console.log("File has changed: translating again:", targetPath);
            }
            const langCode = /** @type {Language} */ (kvp[0]);
            console.log(`Translating ${sourceFile.filename} to ${langCode}`);
            const previousTranslation = didTranslateBefore ? readFileSync(targetPath, "utf-8") : null;
            const job = getTranslation(model, content, previousTranslation, langCode)
                .catch(err => {
                    console.error("Error translating file:", err.message);
                    return null;
                })
                .then(translatedContent => {
                    if (!translatedContent) {
                        console.error("No translated content found for file:", sourceFile.filepath);
                        return;
                    }
                    const localDir = dirname(targetPath);
                    console.log(`Saving translation (${langCode}) to ${localDir}`);
                    mkdirSync(localDir, { recursive: true });
                    writeFileSync(targetPath, translatedContent);
                    writeFileSync(hashfilepath, contentMd5);
                });
            currentTranslationJobs.push(job);
        }

        await Promise.all(currentTranslationJobs);
    }
    const elapsedTime = Date.now() - startTime;
    console.log(`Translation completed in ${Math.floor(elapsedTime / 1000)} seconds`);

}

/**
 * @param {string} dir
 * @param {Array<LocalFile>} res Markdown files array
 * @param {string} [currentRelPath] Relative path to the file
 * @returns {Promise<Array<LocalFile>>}
 */
async function getMarkdownFiles(dir, res, currentRelPath) {
    const items = readdirSync(dir);
    for (const item of items) {
        const relpath = currentRelPath ? `${currentRelPath}/${item}` : item;
        const itemPath = `${dir}/${item}`;
        const stat = statSync(itemPath);
        if (stat.isDirectory()) {
            // Skip node_modules and .git folders
            if (item === "node_modules" || item === ".git") {
                continue;
            }
            else if (item === "lang") {
                // Skip lang folder
                continue;
            }
            await getMarkdownFiles(itemPath, res, relpath);
        }
        else {
            if (item.startsWith("_")) {
                // Skip files starting with _
                console.error("Skipping file:", item);
                continue;
            }
            if (item.endsWith(".md")) {
                res.push({ filename: item, filepath: itemPath, relpath: relpath });
            }
        }
    }
    return res;
}

/**
 * @param {GenerativeModel} model
 * @param {string} text 
 * @param {string | null} previousTranslation
 * @param {Language} language 
 */
async function getTranslation(model, text, previousTranslation, language) {

    /** @type {import("@google/generative-ai").GenerateContentRequest} */
    const requestOptions = {
        systemInstruction: {
            role: "system",
            parts: [{
                text: `Translate the following text to ${language}. 
                    Keep it in markdown format, don't change the format in any way. 
                    Don't translate brand names, URL paths, code snippets.
                    For technical terms you may use the original English term if there is no good translation or if the translation is not commonly used.
                    Don't add any additional information or comments, however you may translate comments found in code snippets.
                    Don't add any additional formatting or styling. 
                    If the markdown file contains HTML tags, keep them as they are and just translate the text inside them or SEO related ALT tags.
                    Just return the translated text and nothing else. 
                    Insert a hint 'Page automatically translated using AI' at the end of the text (two lines after the end and translate 'Page automatically translated...' to ${language})`
            }]
        },
        contents: [
            {
                role: "user",
                parts: [{
                    text: text
                }]
            }],
    }
    if (previousTranslation != null) {
        requestOptions.contents.push({
            role: "user",
            parts: [{
                text: "Your previous translation:\n" + previousTranslation
            }]
        });
    }


    const response = await model.generateContent(requestOptions);
    const translation = response.response.text();
    return translation;
}