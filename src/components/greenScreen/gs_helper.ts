function forceDownload(blob: string, filename: string) {
    const a = document.createElement("a");
    a.download = filename;
    a.href = blob;
    // For Firefox https://stackoverflow.com/a/32226068
    document.body.appendChild(a);
    a.click();
    a.remove();
}

const downloadResource = (
    filename: string | undefined,
    url = "",
    title = "greenscreen",
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    callback = () => {}
) => {
    // eslint-disable-next-line no-param-reassign
    if (!filename) {
        // eslint-disable-next-line no-param-reassign
        filename = title;
    }
    let fileExtension = ".mp4";
    try {
        const { match } = new URL(url).pathname;
        if (match(/\.[0-9a-z]+$/i)) {
            const [first] = match(/\.[0-9a-z]+$/i) || [".mp4"];
            fileExtension = first;
        }
    } catch {
        /* empty */
    }
    fetch(url, {
        headers: new Headers({
            Origin: window.location.origin,
        }),
        mode: "cors",
    })
        .then(response => response.blob())
        .then(blob => {
            const blobUrl = window.URL.createObjectURL(blob);
            forceDownload(blobUrl, filename + fileExtension);
            callback();
        })
        .catch(e => {
            console.error(e);
            forceDownload(url, filename + fileExtension);
        });
};

export const downloadGreenScreen = (
    sku: string,
    title: string,
    fallbackSrc: string,
    successCallback: () => void
) => {
    fetch(
        `https://api.creatorset.com/api/v1/product/greenscreen-dl/${sku}`
    ).then(response => {
        response.json().then(res => {
            if (res.data) {
                console.log("FGS LINK", res.data[0]);
                const filename = title
                    .replace(/\./g, "")
                    .split(" ")
                    .join("")
                    .substring(0, 40);

                downloadResource(filename, res.data[0], title, () => {
                    successCallback();
                });
            } else {
                const xhr = new XMLHttpRequest();
                xhr.open("get", fallbackSrc, true);
                // Load the data directly as a Blob.
                xhr.responseType = "blob";
                xhr.onload = () => {
                    const url = window.URL.createObjectURL(xhr.response);
                    const a = document.createElement("a");
                    a.style.display = "none";
                    a.href = url;
                    const tempTitle = title.replace(/\./g, "");
                    a.download = `${tempTitle
                        .split(" ")
                        .join("")
                        .substring(0, 40)}.mp4`;
                    document.body.appendChild(a);
                    a.click();
                    // window.URL.revokeObjectURL(url);
                    successCallback();
                };
                xhr.send();
            }
        });

        // document.getElementById('dl-button').children[0].children[0].style.fill = 'red'
    });
};
