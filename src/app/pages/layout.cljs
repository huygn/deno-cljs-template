(ns app.pages.layout)

(defn layout [page]
  [:<>
   [:header
    [:nav
     [:a {:href "/" :style {:margin-right "8px"}} "Home"]
     [:a {:href "/about"} "About"]]]
   page])
