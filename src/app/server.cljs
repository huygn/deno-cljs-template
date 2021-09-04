(ns app.server
  (:require [uix.dom.alpha :refer (render-to-string)]
            [app.main :refer (app)]
            ["react-dom/server" :as ReactDOMServer]))

(js/goog.exportSymbol "ReactDOMServer" ReactDOMServer)

(defn render []
  (render-to-string [app]))

(def head
  "<!DOCTYPE html><html><head><title>Page</title>
  </head><body><div id=\"root\">")

(def end
  "</div></body></html>")

(defn render-html []
  (str head (render-to-string [app]) end))

(defn init []
  (js/addEventListener
   "fetch"
   (fn [e]
     (->> (js/Response. (render-html) (clj->js {:headers
                                           {:content-type "text/html;charset=utf-8"}}))
          (.respondWith e)))))
