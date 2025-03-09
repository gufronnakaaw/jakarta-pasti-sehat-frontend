import { decodeHtmlEntities } from "@/utils/decodeHtml";
import { CKEditor as CKEditorComponent } from "@ckeditor/ckeditor5-react";
import {
  Alignment,
  Bold,
  ClassicEditor,
  Essentials,
  FontSize,
  Heading,
  Image,
  ImageResize,
  ImageResizeHandles,
  ImageToolbar,
  ImageUpload,
  Italic,
  Link,
  List,
  Paragraph,
  SimpleUploadAdapter,
  Table,
  TableToolbar,
  Undo,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";

type CKEditorProps = {
  value: string;
  onChange: (text: string) => void;
  token: string;
};

export default function CKEditor({ value, onChange, token }: CKEditorProps) {
  return (
    <CKEditorComponent
      editor={ClassicEditor}
      config={{
        licenseKey: "GPL",
        toolbar: {
          items: [
            "undo",
            "|",
            "|",
            "heading",
            "|",
            "fontsize",
            "|",
            "bold",
            "italic",
            "|",
            "uploadImage",
            "insertTable",
            "|",
            "bulletedList",
            "numberedList",
            "alignment",
            "|",
            "link",
          ],
          shouldNotGroupWhenFull: true,
        },
        table: {
          contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
        },
        plugins: [
          Bold,
          Essentials,
          Italic,
          Heading,
          Paragraph,
          Undo,
          List,
          FontSize,
          Table,
          TableToolbar,
          SimpleUploadAdapter,
          ImageToolbar,
          Image,
          ImageUpload,
          ImageResize,
          ImageResizeHandles,
          Alignment,
          Link,
        ],
        simpleUpload: {
          uploadUrl: `https://${process.env.NEXT_PUBLIC_MODE === "production" ? "api" : "dev"}.jakartapastisehat.com/api/contents/image`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }}
      data={value}
      onChange={(event, editor) => {
        onChange(decodeHtmlEntities(editor.getData()));
      }}
    />
  );
}
