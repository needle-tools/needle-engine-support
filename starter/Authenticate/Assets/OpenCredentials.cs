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
		await Task.Delay(2000);
		SettingsService.OpenProjectSettings("Project/Package Manager/Credentials");

	}

#endif
}