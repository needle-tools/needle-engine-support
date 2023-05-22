using System;

[Serializable]
public class CustomSubData
{
    public string subString;
    public float subNumber;
}
	
[Serializable]
public class CustomData
{
    public string myStringField;
    public float myNumberField;
    public bool myBooleanField;
    public CustomSubData subData;
}