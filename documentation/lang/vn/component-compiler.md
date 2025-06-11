---
title: Tự động tạo Component
tags:
  - codegen
  - components
  - unity
  - blender
  - editor
  - typescript
  - csharp
---

### Tự động tạo các Component Editor

Khi làm việc trong Unity hoặc Blender, bạn sẽ nhận thấy rằng khi tạo một Needle Engine component mới bằng Typescript hoặc Javascript, nó sẽ tự động tạo một Unity C# stub component HOẶC một Blender panel cho bạn.

Điều này là nhờ sự kỳ diệu của [Needle component compiler](https://www.npmjs.com/package/@needle-tools/needle-component-compiler) chạy ngầm trong môi trường Editor và theo dõi các thay đổi đối với tệp script của bạn. Khi nó nhận thấy bạn đã tạo một Needle Engine component mới, nó sẽ tạo ra component Unity hoặc Blender panel tương ứng, bao gồm các biến public hoặc properties mà bạn có thể đặt hoặc liên kết từ bên trong Editor.


**Lưu ý**: Component compiler hiện tại **chỉ tạo component**. Vì vậy, nếu bạn cần expose một Typescript Enum trong Unity, bạn có thể thêm nó vào C# của mình theo cách thủ công trong một tệp C# mới hoặc bên ngoài mã được tạo (xem ví dụ bên dưới)


### Kiểm soát việc tạo component
Bạn có thể sử dụng các comment sau trong mã Typescript của mình để kiểm soát hành vi tạo mã C#:
| Thuộc tính | Kết quả |
| -- | -- |
| `// @generate-component` | Buộc tạo class tiếp theo |
| `// @dont-generate-component` | Vô hiệu hóa việc tạo class tiếp theo, điều này hữu ích trong trường hợp bạn đã có script C# hiện có trong dự án của mình |
| `// @serializeField` | Thêm thuộc tính `[SerializeField]` vào trường được tạo |
| `// @type UnityEngine.Camera` | Chỉ định kiểu trường C# được tạo |
| `// @nonSerialized` | Bỏ qua việc tạo trường hoặc phương thức tiếp theo |

#### Ví dụ

Buộc component compiler tạo trường C# AudioClip có tên `myAudioClip`
```ts twoslash
import { Behaviour, serializable } from "@needle-tools/engine";

export class MyComponent extends Behaviour {
	//@type UnityEngine.AudioClip
	@serializable()
	myAudioClip?: string;
}

```

Buộc component compiler kế thừa từ một lớp con cụ thể
```ts twoslash
import { Behaviour } from "@needle-tools/engine";
export class MyCustomBaseClass extends Behaviour { /* ... */ }
// ---cut-before---
//@type MyNamespace.MyCustomBaseClass
export class MyComponent extends MyCustomBaseClass {
}
```


### Component Compiler trong Unity
Nếu bạn muốn thêm script bên trong thư mục ``src/scripts`` trong dự án của mình, bạn cần có một ``Component Generator`` trên GameObject chứa component ``ExportInfo`` của bạn.
Bây giờ, khi thêm các component mới vào ``your/threejs/project/src/scripts`` nó sẽ tự động tạo các script Unity trong `Assets/Needle/Components.codegen`.
Nếu bạn muốn thêm script vào bất kỳ tệp NpmDef nào, bạn chỉ cần tạo chúng - mỗi NpmDef tự động theo dõi các thay đổi script và xử lý việc tạo component, vì vậy bạn không cần bất kỳ component bổ sung nào trong scene của mình.

Để các trường C# được tạo đúng cách, hiện tại điều quan trọng là bạn phải khai báo rõ ràng kiểu Typescript. Ví dụ: ``myField : number = 5``

Bạn có thể chuyển đổi giữa đầu vào **Typescript** và các C# stub component được tạo bằng cách sử dụng các tab bên dưới
::: code-tabs
@tab Typescript
```ts twoslash
import { AssetReference, Behaviour, serializable } from "@needle-tools/engine";
import { Object3D } from "three";

export class MyCustomComponent extends Behaviour {
    @serializable()
    myFloatValue: number = 42;

    @serializable(Object3D)
    myOtherObject?: Object3D;

    @serializable(AssetReference)
    prefabs: AssetReference[] = [];

    start() {
        this.sayHello();
    }

    private sayHello() {
        console.log("Hello World", this);
    }
}
```
@tab Generated C#
```csharp
// NEEDLE_CODEGEN_START
// auto generated code - do not edit directly

#pragma warning disable

namespace Needle.Typescript.GeneratedComponents
{
	public partial class MyCustomComponent : UnityEngine.MonoBehaviour
	{
		public float @myFloatValue = 42f;
		public UnityEngine.Transform @myOtherObject;
		public UnityEngine.Transform[] @prefabs = new UnityEngine.Transform[]{ };
		public void start(){}
		public void update(){}
	}
}

// NEEDLE_CODEGEN_END
```
@tab Extending Generated C#
```csharp
using UnityEditor;

// you can add code above or below the NEEDLE_CODEGEN_ blocks

// NEEDLE_CODEGEN_START
// auto generated code - do not edit directly

#pragma warning disable

namespace Needle.Typescript.GeneratedComponents
{
	public partial class MyCustomComponent : UnityEngine.MonoBehaviour
	{
		public float @myFloatValue = 42f;
		public UnityEngine.Transform @myOtherObject;
		public UnityEngine.Transform[] @prefabs = new UnityEngine.Transform[]{ };
		public void start(){}
		public void update(){}
	}
}

// NEEDLE_CODEGEN_END

namespace Needle.Typescript.GeneratedComponents
{
    // This is how you extend the generated component (namespace and class name must match!)
	public partial class MyCustomComponent : UnityEngine.MonoBehaviour
	{
		
		public void MyAdditionalMethod()
		{
		}

		private void OnValidate()
		{
			myFloatValue = 42;
		}
	}

    // of course you can also add custom editors
	[CustomEditor(typeof(MyCustomComponent))]
	public class MyCustomComponentEditor : Editor
	{
		public override void OnInspectorGUI()
		{
			EditorGUILayout.HelpBox("This is my sample component", MessageType.None);
			base.OnInspectorGUI();
		}
	}
}

```
:::


### Mở rộng các component đã tạo
Các lớp C# component được tạo với cờ [`partial`](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/partial-classes-and-methods) để dễ dàng mở rộng chúng với chức năng. Điều này hữu ích để vẽ gizmos, thêm context menus hoặc thêm các trường hoặc phương thức bổ sung không phải là một phần của component tích hợp sẵn.


:::tip Quy tắc viết hoa/thường thành viên
Các thành viên được export sẽ bắt đầu bằng một chữ cái thường. Ví dụ, nếu thành viên C# của bạn có tên ``MyString``, nó sẽ được gán cho ``myString``.
:::

Trang được dịch tự động bằng AI