import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

export default function TextEditor() {
  return (
    <>
      <h3 className="font-semibold">제목</h3>
      <input
        type="text"
        id="first_name"
        className="bg-transparent border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      />
      <h3 className="font-semibold">본문</h3>
      <Editor
        initialValue="내용을 입력하세요."
        previewStyle="vertical"
        height="300px"
        initialEditType="wysiwyg"
      />
    </>
  );
}
