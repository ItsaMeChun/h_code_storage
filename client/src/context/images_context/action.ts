import axios from "axios";
import * as constants from "./constants"

export async function getImages(dispatch: React.Dispatch<any>, page: number = 0) {
    const req = await axios.get(`http://localhost:8080/hentaibu/api/sauce/get-all?sauceTypeId=9&page=${page}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${window.btoa(
                "hentaibu:507c6e34b77b5916c3b791e2ff627114"
            )}`,
        },
    });
    const res: PageType<ImageResponse> = await req.data;
    dispatch(getAllImage(res.content));
    dispatch(setTotalPage(res.totalElements));
}
export async function addImage(dispatch: React.Dispatch<any>, formData: FormData) {
    try {
        const req = await axios.post("http://localhost:8080/hentaibu/api/sauce/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Basic ${window.btoa(
                    "hentaibu:507c6e34b77b5916c3b791e2ff627114"
                )}`,
            },
        })
        const res: ImageResponse[] = await req.data;
        dispatch(setImage(res));
    }
    catch (ex) {
        const error = ex as Error;
        throw new Error(error.message);
    }
}
export async function deleteImage(dispatch: React.Dispatch<any>, imageId: number) {
    const req = await axios.delete(
        `http://localhost:8080/hentaibu/api/sauce/delete/${imageId}`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${window.btoa(
                    "hentaibu:507c6e34b77b5916c3b791e2ff627114"
                )}`,
            },
        }
    );
    console.log(req.data);
    dispatch(removeImage(imageId));
}

function getAllImage(payload: ImageResponse[]) {
    return {
        type: constants.GET_IMAGES,
        payload
    }
}

function setImage(payload: ImageResponse[]) {
    return {
        type: constants.ADD_IMAGE,
        payload
    }
}
function setTotalPage(payload: number) {
    return {
        type: constants.GET_TOTAL_PAGE,
        payload
    }
}
function removeImage(payload: number) {
    return {
        type: constants.REMOVE_IMAGE,
        payload
    }
}