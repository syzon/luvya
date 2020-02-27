import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HelperService {

    convertStringToDate(dateAsString: String) {
        let pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
        let dt = new Date(dateAsString.replace(pattern, '$3-$2-$1'));
        return dt;
    }

    toDataUrl(url, callback) {
        console.log(url)
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var reader = new FileReader();
            reader.onloadend = function () {
                callback(reader.result);
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }

    async getBase64ImageFromUrl(imageUrl) {
        var res = await fetch(imageUrl);
        var blob = await res.blob();

        return new Promise((resolve, reject) => {
            var reader = new FileReader();
            reader.addEventListener("load", function () {
                resolve(reader.result);
            }, false);

            reader.onerror = () => {
                return reject(this);
            };
            reader.readAsDataURL(blob);
        })
    }


}


