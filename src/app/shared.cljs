(ns app.shared
  (:require [app.pages.home :refer (page) :rename {page home}]
            [app.pages.about :refer (page) :rename {page about}]))

(defonce pages-map
  {:home {:path "/"
          :component home}
   :about {:path "/about"
           :component about}})

(defonce paths-map
  (reduce (fn [prev [k v]]
            (assoc prev (:path v) k))
          {}
          pages-map))

(defn get-page [name]
  (-> (keyword name)
      pages-map
      :component))

(defn get-page-name [path]
  (clj->js (get paths-map path)))

(defonce js-paths-map (clj->js paths-map))
