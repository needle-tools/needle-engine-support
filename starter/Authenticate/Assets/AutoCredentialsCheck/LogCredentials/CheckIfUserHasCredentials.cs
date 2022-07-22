using System.IO;
using System.Threading.Tasks;
using Needle.PackageCredentials.Core;
using UnityEditor;
using UnityEditorInternal;
using UnityEngine;

internal static class CheckIfUserHasCredentials 
{
    [InitializeOnLoadMethod]
    private static async void Init()
    {
        while (true)
        {
            await Task.Delay(1000);
            var credentialManager = new CredentialManager();
            foreach (var reg in credentialManager.Registries)
            {
                if (reg.Contains("packages.needle.tools"))
                {
                    var cred = credentialManager.GetCredential(reg);
                    if(cred == null) continue;
                    if (string.IsNullOrWhiteSpace(cred.token) || string.IsNullOrWhiteSpace(cred.url)) continue;
                    var otherProjectPath = TryFindOtherProjectPath();
                    if (otherProjectPath != null)
                    {
                        if (EditorUtility.DisplayDialog("Auth Complete",
                                "You are authenticated for " + reg + " and are ready to dive into Needle Engine. Do you want to open the project now?", "Yes, open the Needle Engine project", "No"))
                        {
                            EditorApplication.OpenProject(otherProjectPath);
                        }
                    }
                }
            }
            await Task.Delay(1000);
        }
    }

    private static string TryFindOtherProjectPath()
    {
        var selfPath = Path.GetFullPath(Application.dataPath + "/..");
        var searchDir = new DirectoryInfo(selfPath + "/../");
        var selfDir = new DirectoryInfo(selfPath);
        foreach (var d in searchDir.EnumerateDirectories())
        {
            if (d.Name != selfDir.Name)
            {
                if (Directory.Exists(d.FullName + "/Assets"))
                {
                    return d.FullName; 
                }
            }
        }
        return null;
    }
}
