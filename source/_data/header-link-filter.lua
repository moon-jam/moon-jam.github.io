-- header-link-filter.lua
function Header(el)
    -- Create a link
    local link = pandoc.Link("", "#" .. el.identifier, "", pandoc.Attr("", {"headerlink"}))
  
    -- Insert the link into the header content
    table.insert(el.content, pandoc.Space())
    table.insert(el.content, link)
  
    return el
  end
  