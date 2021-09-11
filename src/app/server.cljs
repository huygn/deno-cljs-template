(ns app.server
  (:require [uix.dom.alpha :refer (render-to-string)]
            [app.shared :refer (get-page)]
            ["react-dom/server" :as ReactDOMServer]))

(js/goog.exportSymbol "ReactDOMServer" ReactDOMServer)

(defn render [page]
  (render-to-string [(get-page page)]))
