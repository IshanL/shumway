/* -*- Mode: js; js-indent-level: 2; indent-tabs-mode: nil; tab-width: 2 -*- */
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */
/*
 * Copyright 2014 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

module Shumway {
  declare var XMLHttpRequest;
  import unexpected = Shumway.Debug.unexpected;

  export interface BinaryFileReaderProgressInfo {
    loaded: number;
    total: number;
  }

  export class BinaryFileReader {
    url: string;
    method: string;
    mimeType: string;
    data: any;

    constructor(url: string, method?: string, mimeType?: string, data?) {
      this.url = url;
      this.method = method;
      this.mimeType = mimeType;
      this.data = data;
    }

    readAll(progress: (response: any, loaded: number, total: number) => void,
            complete: (response: any, error?: any) => void) {
      var url = this.url;
      var xhr = new XMLHttpRequest({mozSystem: true});
      var async = true;
      xhr.open(this.method || "GET", this.url, async);
      xhr.responseType = "arraybuffer";
      if (progress) {
        xhr.onprogress = function (event) {
          progress(xhr.response, event.loaded, event.total);
        };
      }
      xhr.onreadystatechange = function (event) {
        if (xhr.readyState === 4) {
          if (xhr.status !== 200 && xhr.status !== 0 || xhr.response === null) {
            unexpected("Path: " + url + " not found.");
            complete(null, xhr.statusText);
            return;
          }
          complete(xhr.response);
        }
      };
      if (this.mimeType) {
        xhr.setRequestHeader("Content-Type", this.mimeType);
      }
      xhr.send(this.data || null);
    }

    readAsync(ondata: (data: Uint8Array, progress: BinaryFileReaderProgressInfo) => void,
              onerror: (err: any) => void,
              onopen?: () => void,
              oncomplete?: () => void,
              onhttpstatus?: (location: string, status: string, responseHeaders: any) => void) {
      var xhr = new XMLHttpRequest({mozSystem: true});
      var url = this.url;
      xhr.open(this.method || "GET", url, true);
      xhr.responseType = 'moz-chunked-arraybuffer';
      var isNotProgressive = xhr.responseType !== 'moz-chunked-arraybuffer';
      if (isNotProgressive) {
        xhr.responseType = 'arraybuffer';
      }
      xhr.onprogress = function (e) {
        if (isNotProgressive) {
            return;
        }
        ondata(new Uint8Array(xhr.response), { loaded: e.loaded, total: e.total });
      };
      xhr.onreadystatechange = function (event) {
        if (xhr.readyState === 2 && onhttpstatus) {
          onhttpstatus(url, xhr.status, xhr.getAllResponseHeaders());
        }
        if (xhr.readyState === 4) {
          if (xhr.status !== 200 && xhr.status !== 0 || xhr.response === null) {
            onerror(xhr.statusText);
            return;
          }
          if (isNotProgressive) {
            var buffer = xhr.response;
            ondata(new Uint8Array(buffer), { loaded: 0, total: buffer.byteLength });
          }
          if (oncomplete) {
            oncomplete();
          }
        }
      };
      if (this.mimeType) {
        xhr.setRequestHeader("Content-Type", this.mimeType);
      }
      xhr.send(this.data || null);
      if (onopen) {
        onopen();
      }
    }
  }
}

