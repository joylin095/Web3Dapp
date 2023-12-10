import { useState } from "react";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { ImageSendToIPFS } from "../../Model/SendToIPFS";
import { MintNft } from "../../Model/MintNFT";

function Upload() {
  const [state, setState] = useState({
    course: "",
    exam: "",
  });
  const [imgData, setImageData] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const { course, exam } = state;

  const HandleSelectFileChanged = (e) => {
    setImgFile(e.target.files[0]);
    let file = e.target.files[0];
    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImageData(e.target.result);
      };
    }
  };

  const HandleInputChanged = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const HandleUploadClick = async (e) => {
    e.preventDefault();
    if (imgFile) {
      window.alert("上傳中");
      const pinataImgResponse = await ImageSendToIPFS(imgFile);
      if (!pinataImgResponse.success) {
        alert("上傳錯誤");
      } else {
        const mintNft = await MintNft(
          pinataImgResponse.pinataUrl,
          course,
          exam
        );
        if (mintNft.success) {
          alert(`上傳完成，tsHash:\n${mintNft.txHash}`);
        } else {
          alert("交易失敗");
        }
      }
    }
  };

  return (
    <div className="mt-3 d-flex flex-column align-items-center">
      <Form
        controlId="formfile"
        className="d-flex flex-column"
        style={{ width: "750px", height: "750px" }}
        onSubmit={HandleUploadClick}
      >
        <Form.Group className="mt-3">
          <Form.Label>選擇考卷</Form.Label>
          <Form.Control
            type="file"
            accept="image/jpeg, image/png"
            onChange={HandleSelectFileChanged}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Image
            src={imgData}
            className="mt-3"
            style={{
              maxWidth: "75%",
              maxHeight: "75%",
            }}
          ></Image>
        </Form.Group>

        <Form.Group>
          <Form.Label className="mt-4">課程名稱</Form.Label>
          <Form.Control
            type="text"
            name="course"
            value={course}
            placeholder="ex:物件導向"
            required
            onChange={HandleInputChanged}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label className="mt-4">標題</Form.Label>
          <Form.Control
            type="text"
            name="exam"
            value={exam}
            placeholder="ex:期中考"
            required
            onChange={HandleInputChanged}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Button type="submit" variant="success" className="mt-5">
            上傳
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Upload;
