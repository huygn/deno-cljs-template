(ns app.server
  (:require
   [app.shared :refer [name-from-path final-page]]
   [app.pages.home :refer (page) :rename {page home}]
   [app.pages.about :refer (page) :rename {page about}]
   ["react-dom/server" :as ReactDOMServer]))

(defonce pages-map
  {:home home
   :about about})

(defn get-page [path]
  (-> (name-from-path path) pages-map))

(defn render [path]
  (let [page (get-page path)]
    (when page
      (ReactDOMServer/renderToString (final-page page)))))
