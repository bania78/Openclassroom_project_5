/*
(function($) {
  $.fn.mauGallery = function(options) {
    var options = $.extend($.fn.mauGallery.defaults, options);
    var tagsCollection = [];
    return this.each(function() {
      $.fn.mauGallery.methods.createRowWrapper($(this));
      if (options.lightBox) {
        $.fn.mauGallery.methods.createLightBox(
          $(this),
          options.lightboxId,
          options.navigation
        );
      }
      $.fn.mauGallery.listeners(options);

      $(this)
        .children(".gallery-item")
        .each(function(index) {
          $.fn.mauGallery.methods.responsiveImageItem($(this));
          $.fn.mauGallery.methods.moveItemInRowWrapper($(this));
          $.fn.mauGallery.methods.wrapItemInColumn($(this), options.columns);
          var theTag = $(this).data("gallery-tag");
          if (
            options.showTags &&
            theTag !== undefined &&
            tagsCollection.indexOf(theTag) === -1
          ) {
            tagsCollection.push(theTag);
          }
        });

      if (options.showTags) {
        $.fn.mauGallery.methods.showItemTags(
          $(this),
          options.tagsPosition,
          tagsCollection
        );
      }

      $(this).fadeIn(500);
    });
  };
  $.fn.mauGallery.defaults = {
    columns: 3,
    lightBox: true,
    lightboxId: null,
    showTags: true,
    tagsPosition: "bottom",
    navigation: true
  };
  $.fn.mauGallery.listeners = function(options) {
    $(".gallery-item").on("click", function() {
      if (options.lightBox && $(this).prop("tagName") === "IMG") {
        $.fn.mauGallery.methods.openLightBox($(this), options.lightboxId);
      } else {
        return;
      }
    });

    $(".gallery").on("click", ".nav-link", $.fn.mauGallery.methods.filterByTag);
    $(".gallery").on("click", ".mg-prev", () =>
      $.fn.mauGallery.methods.prevImage(options.lightboxId)
    );
    $(".gallery").on("click", ".mg-next", () =>
      $.fn.mauGallery.methods.nextImage(options.lightboxId)
    );
  };
  $.fn.mauGallery.methods = {
    createRowWrapper(element) {
      if (
        !element
          .children()
          .first()
          .hasClass("row")
      ) {
        element.append('<div class="gallery-items-row row"></div>');
      }
    },
    wrapItemInColumn(element, columns) {
      if (columns.constructor === Number) {
        element.wrap(
          `<div class='item-column mb-4 col-${Math.ceil(12 / columns)}'></div>`
        );
      } else if (columns.constructor === Object) {
        var columnClasses = "";
        if (columns.xs) {
          columnClasses += ` col-${Math.ceil(12 / columns.xs)}`;
        }
        if (columns.sm) {
          columnClasses += ` col-sm-${Math.ceil(12 / columns.sm)}`;
        }
        if (columns.md) {
          columnClasses += ` col-md-${Math.ceil(12 / columns.md)}`;
        }
        if (columns.lg) {
          columnClasses += ` col-lg-${Math.ceil(12 / columns.lg)}`;
        }
        if (columns.xl) {
          columnClasses += ` col-xl-${Math.ceil(12 / columns.xl)}`;
        }
        element.wrap(`<div class='item-column mb-4${columnClasses}'></div>`);
      } else {
        console.error(
          `Columns should be defined as numbers or objects. ${typeof columns} is not supported.`
        );
      }
    },
    moveItemInRowWrapper(element) {
      element.appendTo(".gallery-items-row");
    },
    responsiveImageItem(element) {
      if (element.prop("tagName") === "IMG") {
        element.addClass("img-fluid");
      }
    },
    openLightBox(element, lightboxId) {
      $(`#${lightboxId}`)
        .find(".lightboxImage")
        .attr("src", element.attr("src"));
      $(`#${lightboxId}`).modal("toggle");
    },
    prevImage() {
      let activeImage = null;
      $("img.gallery-item").each(function() {
        if ($(this).attr("src") === $(".lightboxImage").attr("src")) {
          activeImage = $(this);
        }
      });
      let activeTag = $(".tags-bar span.active-tag").data("images-toggle");
      let imagesCollection = [];
      if (activeTag === "all") {
        $(".item-column").each(function() {
          if ($(this).children("img").length) {
            imagesCollection.push($(this).children("img"));
          }
        });
      } else {
        $(".item-column").each(function() {
          if (
            $(this)
              .children("img")
              .data("gallery-tag") === activeTag
          ) {
            imagesCollection.push($(this).children("img"));
          }
        });
      }
      let index = 0,
        next = null;

      $(imagesCollection).each(function(i) {
        if ($(activeImage).attr("src") === $(this).attr("src")) {
          index = i ;
        }
      });
      next =
        imagesCollection[index] ||
        imagesCollection[imagesCollection.length - 1];
      $(".lightboxImage").attr("src", $(next).attr("src"));
    },
    nextImage() {
      let activeImage = null;
      $("img.gallery-item").each(function() {
        if ($(this).attr("src") === $(".lightboxImage").attr("src")) {
          activeImage = $(this);
        }
      });
      let activeTag = $(".tags-bar span.active-tag").data("images-toggle");
      let imagesCollection = [];
      if (activeTag === "all") {
        $(".item-column").each(function() {
          if ($(this).children("img").length) {
            imagesCollection.push($(this).children("img"));
          }
        });
      } else {
        $(".item-column").each(function() {
          if (
            $(this)
              .children("img")
              .data("gallery-tag") === activeTag
          ) {
            imagesCollection.push($(this).children("img"));
          }
        });
      }
      let index = 0,
        next = null;

      $(imagesCollection).each(function(i) {
        if ($(activeImage).attr("src") === $(this).attr("src")) {
          index = i;
        }
      });
      next = imagesCollection[index] || imagesCollection[0];
      $(".lightboxImage").attr("src", $(next).attr("src"));
    },
    createLightBox(gallery, lightboxId, navigation) {
      gallery.append(`<div class="modal fade" id="${
        lightboxId ? lightboxId : "galleryLightbox"
      }" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-body">
                            ${
                              navigation
                                ? '<div class="mg-prev" style="cursor:pointer;position:absolute;top:50%;left:-15px;background:white;"><</div>'
                                : '<span style="display:none;" />'
                            }
                            <img class="lightboxImage img-fluid" alt="Contenu de l'image affichée dans la modale au clique"/>
                            ${
                              navigation
                                ? '<div class="mg-next" style="cursor:pointer;position:absolute;top:50%;right:-15px;background:white;}">></div>'
                                : '<span style="display:none;" />'
                            }
                        </div>
                    </div>
                </div>
            </div>`);
    },
    showItemTags(gallery, position, tags) {
      var tagItems =
        '<li class="nav-item"><span class="nav-link active active-tag"  data-images-toggle="all">Tous</span></li>';
      $.each(tags, function(index, value) {
        tagItems += `<li class="nav-item active">
                <span class="nav-link"  data-images-toggle="${value}">${value}</span></li>`;
      });
      var tagsRow = `<ul class="my-4 tags-bar nav nav-pills">${tagItems}</ul>`;

      if (position === "bottom") {
        gallery.append(tagsRow);
      } else if (position === "top") {
        gallery.prepend(tagsRow);
      } else {
        console.error(`Unknown tags position: ${position}`);
      }
    },
    filterByTag() {
      if ($(this).hasClass("active-tag")) {
        return;
      }
      $(".active-tag").removeClass("active active-tag");
      $(this).addClass("active-tag");

      var tag = $(this).data("images-toggle");

      $(".gallery-item").each(function() {
        $(this)
          .parents(".item-column")
          .hide();
        if (tag === "all") {
          $(this)
            .parents(".item-column")
            .show(300);
        } else if ($(this).data("gallery-tag") === tag) {
          $(this)
            .parents(".item-column")
            .show(300);
        }
      });
    }
  };
})(jQuery); */

function checkData(check, data) {
  for (var l = 0; l < check.length; l++) {
    if (check[l] == data) {
        return false
      }
  }
  return true
}

function filterSelection(param) {
  let item = document.getElementsByClassName("item-column mb-4 col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4");
  let item_img;
  if (param == 'all') {
    for (var i = 0; i < item.length; i++)
      item[i].style = "";
  } else {
    for (var i = 0; i < item.length; i++) {
      item_img = item[i].querySelector(".gallery-item");
      if (item_img.getAttribute("data-gallery-tag") != param)
        item[i].style.display = "none";
      if (item_img.getAttribute("data-gallery-tag") == param & item[i].style.display == "none")
        item[i].style = "";
    }
  }
}

function addEventFilter(span) {
  span.addEventListener("click", function() {
    var current = document.getElementsByClassName("nav-link active active-tag");
    current[0].className = current[0].className.replace("nav-link active active-tag", "nav-link");
    this.className += " active active-tag";
    filterSelection(this.getAttribute("data-images-toggle"));
  });
}

function addEventItem(gallery, img) {
  let modal = document.querySelector(".modal")
  let modal_img = gallery.querySelector(".lightboxImage")
  img.addEventListener("click", function() {
    modal_img.src = img.src;
    modal.removeAttribute("aria-hidden");
    modal.className += " show";
    modal.setAttribute("aria-modal", "true");
    modal.style.display = "block";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("tabindex", img.getAttribute("index"))
  });
}

function setFilters() {
  let arrow = 0;
  let div_gallery = document.querySelector(".gallery")
  div_gallery.style = "";
  let ul_gallery = document.createElement("ul");
  ul_gallery.className = "my-4 tags-bar nav nav-pills"
  let gallery = document.getElementsByClassName("gallery-item");
  let filter_all = document.createElement("li");
  filter_all.className = "nav-item"
  div_gallery.appendChild(ul_gallery);
  let lightbox = document.createElement("div");
  lightbox.id = "myAwesomeLightbox";
  lightbox.className = "modal fade";
  lightbox.setAttribute("tabindex", -1);
  lightbox.style.display = "none";
  lightbox.setAttribute("aria-hidden", "true");
  div_gallery.appendChild(lightbox);
  let modal_dial = document.createElement("div");
  modal_dial.className = "modal-dialog";
  modal_dial.setAttribute("role", "document");
  lightbox.appendChild(modal_dial);
  let modal_content = document.createElement("div");
  modal_content.className = "modal-content";
  modal_dial.appendChild(modal_content);
  let modal_body = document.createElement("div");
  modal_body.className = "modal-body";
  modal_content.appendChild(modal_body);
  let modal_arrow = document.createElement("div");
  modal_arrow.className = "mg-prev";
  modal_arrow.style = "cursor:pointer;position:absolute;top:50%;left:-15px;background:white;";
  modal_arrow.textContent = "<";
  modal_body.appendChild(modal_arrow);
  let modal_arrow_bis = document.createElement("div");
  modal_arrow_bis.className = "mg-next";
  modal_arrow_bis.style = "cursor:pointer;position:absolute;top:50%;right:-15px;background:white;}";
  modal_arrow_bis.textContent = ">";
  modal_body.appendChild(modal_arrow_bis);
  let modal_img = document.createElement("img");
  modal_img.className = "lightboxImage img-fluid";
  modal_img.setAttribute("alt", "Contenu de l'image affichée dans la modale au clique")
  modal_body.appendChild(modal_img);
  ul_gallery.appendChild(filter_all);
  let div_gallery_bis = document.createElement("div");
  div_gallery_bis.className = "gallery-items-row row"
  div_gallery.appendChild(div_gallery_bis);
  let item = document.getElementsByClassName("gallery-item");
  for (var i = 0; i < item.length; i++) {
    let item_gallery = document.createElement("div");
    item_gallery.className = "item-column mb-4 col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4"
    div_gallery_bis.appendChild(item_gallery);
    item[0].className = "gallery-item img-fluid";
    item[0].setAttribute("index", i);
    addEventItem(modal_body, item[0]);
    item_gallery.appendChild(item[0]);
  }
  let item_gallery = document.getElementsByClassName("item-column mb-4 col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4");
  modal_arrow.addEventListener("click", function() {
    for (let i = (lightbox.getAttribute("tabindex") - 1); i >= 0; i--) {
      if (item_gallery[i].style.display != "none") {
        modal_img.src = item[i].src;
        lightbox.setAttribute("tabindex", item[i].getAttribute("index"))
        arrow = 1;
        return;
      }
    }
    arrow = 1;
  })
  modal_arrow_bis.addEventListener("click", function() {
    for (let i = lightbox.getAttribute("tabindex"); i < item_gallery.length; i++) {
      if (item_gallery[i].style.display != "none" & i != lightbox.getAttribute("tabindex")) {
        modal_img.src = item[i].src;
        lightbox.setAttribute("tabindex", item[i].getAttribute("index"))
        arrow = 1;
        return;
      }
    }
    arrow = 1;
  })
  lightbox.addEventListener("click", function () {
    if (arrow == 1) {
      arrow = 0;
      return;
    }
    lightbox.setAttribute("aria-hidden", "true");
    lightbox.className = "modal fade";
    lightbox.removeAttribute("aria-modal");
    lightbox.style.display = "none";
    lightbox.removeAttribute("role");
  })
  let span_all = document.createElement("span")
  span_all.className = "nav-link active active-tag";
  span_all.setAttribute("data-images-toggle", "all");
  span_all.textContent = "Tous";
  addEventFilter(span_all);
  filter_all.appendChild(span_all)
  let check = ["Tous"];
  let tag;
  for (var i = 0; i < gallery.length; i++) {
    tag = gallery[i].getAttribute("data-gallery-tag");
    if (checkData(check, tag) == true) {
      check.push(tag);
      let filter = document.createElement("li");
      filter.className = "nav-item active"
      ul_gallery.appendChild(filter);
      let span = document.createElement("span")
      span.className = "nav-link";
      span.setAttribute("data-images-toggle", tag);
      span.textContent = tag;
      addEventFilter(span);
      filter.appendChild(span)
    }
  }
}

setFilters();
