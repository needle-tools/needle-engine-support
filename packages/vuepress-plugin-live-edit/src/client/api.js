/**
 * Client for the dev-server endpoints. Server error messages are passed through
 * unchanged for the status line.
 */

/* global __LIVE_EDIT_ENDPOINT__ */
const ENDPOINT = typeof __LIVE_EDIT_ENDPOINT__ === 'string' ? __LIVE_EDIT_ENDPOINT__ : '/__live-edit'

async function call(name, body, method = 'POST') {
  const response = await fetch(`${ENDPOINT}/${name}`, {
    method,
    headers: method === 'POST' ? { 'Content-Type': 'application/json' } : undefined,
    body: method === 'POST' ? JSON.stringify(body ?? {}) : undefined,
  })

  let payload
  try {
    payload = await response.json()
  } catch {
    throw new Error(`live-edit: ${name} returned a non-JSON response (${response.status})`)
  }

  if (!response.ok) {
    const error = new Error(payload?.message || payload?.error || `live-edit: ${name} failed`)
    error.status = response.status
    error.payload = payload
    throw error
  }
  return payload
}

/** Discovered containers and components. */
export const fetchRegistry = (refresh = false) =>
  call(`registry${refresh ? '?refresh=1' : ''}`, undefined, 'GET')

/** Load the markdown behind a route as an editor document. */
export const fetchSource = (route) => call('source', { route })

/**
 * Write an edited document back.
 *
 * `baseSource` is the text the editor was opened on, fixed for the session.
 * `expectHash` is the file's expected current hash. Rejects with `status 409`
 * if the file changed on disk, carrying the current content.
 */
export const saveDoc = ({ route, baseSource, expectHash, doc, frontmatter }) =>
  call('save', { route, baseSource, expectHash, doc, frontmatter })

/** Upload a pasted image and get back the markdown to embed it. */
export const uploadAsset = ({ route, data, alt, name, dir, devicePixelRatio, density }) =>
  call('asset', { route, data, alt, name, dir, devicePixelRatio, density })

/** Read a Blob as a data URL, for upload. */
export function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(reader.error ?? new Error('could not read pasted image'))
    reader.readAsDataURL(blob)
  })
}

/** Which blocks of the file on disk differ from the last commit. */
export const fetchChanges = (route) => call('changes', { route })
