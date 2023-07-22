import { Button, Input } from "antd";
import { useState } from "react";
import DisplayImages from "./DisplayImages";
import axios from "axios";

const ImportModal = () => {
  const [imageInput, setImageInput] = useState<imageInput>({
    author: "",
    blob: [],
    url: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setImageInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    const clipboardItems = Array.from(event.clipboardData.items).filter(
      (item) => /^image\//.test(item.type)
    );

    if (clipboardItems.length === 0) {
      return;
    }

    const item = clipboardItems[0];
    const blob = item.getAsFile();
    if (!blob) {
      return;
    }

    setImageInput((prevInput) => ({
      ...prevInput,
      blob: [...prevInput.blob, blob],
    }));
  };

  const handleImport = () => {
    const formData = new FormData();
    const { blob, url } = imageInput;
    if (blob.length === 0 && url === "") {
      return;
    }
    blob.forEach((file) => {
      formData.append(`files`, file, file.name);
    });
    axios
    .post("http://localhost:8080/hentaibu/api/sauce/upload", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Basic ${window.btoa(
            "hentaibu:507c6e34b77b5916c3b791e2ff627114"
            )}`,
          },
        })
        .then((data) => {
        console.log(data);
      });
  };
  return (
    <div onPaste={handlePaste}>
      <DisplayImages images={imageInput.blob} url={imageInput.url} />
      <div>
        <h4 style={{ marginBottom: "10px" }}>You can Input Url Image</h4>
        <Input
          placeholder="Image author if exist"
          value={imageInput.author}
          style={{ width: "calc(50% - 24px )", margin: "0 3px" }}
          name="author"
          onChange={handleChange}
        />
        <Input
          placeholder="Image URL"
          value={imageInput.url}
          style={{ width: "calc(50% - 24px )", margin: "0 3px" }}
          name="url"
          onChange={handleChange}
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <Button
          style={{ marginTop: "10px" }}
          type="primary"
          onClick={() => handleImport()}
        >
          Import
        </Button>
      </div>
    </div>
  );
};

export default ImportModal;