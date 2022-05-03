using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Threading.Tasks;
using UnityEditor;
using UnityEngine;

public static class OpenCredentials
{
#if UNITY_EDITOR
	[InitializeOnLoadMethod]
	private static async void Init()
	{
		Debug.Log("Please open <b>https://packages.needle.tools</b> in your browser and login using your github account");
		await Task.Delay(2000);
		SettingsService.OpenProjectSettings("Project/Package Manager/Credentials"); 

	}

#endif
}