import galleryItems from "../gallery-items.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  lightbox: document.querySelector(".js-lightbox"),
  lightboxImg: document.querySelector(".lightbox__image"),
  btnClose: document.querySelector('button[data-action="close-lightbox"]'),
};

const createGalleryItem = (galleryItem) => {
  const galleryItemRef = document.createElement("li");
  galleryItemRef.classList.add("gallery__item");

  const originalImgRef = document.createElement("a");
  originalImgRef.classList.add("gallery__link");
  originalImgRef.href = galleryItem.original;

  const previewImgRef = document.createElement("img");
  previewImgRef.classList.add("gallery__image");
  previewImgRef.src = galleryItem.preview;
  previewImgRef.setAttribute("data-source", `${originalImgRef.href}`);
  previewImgRef.alt = galleryItem.description;

  originalImgRef.append(previewImgRef);
  galleryItemRef.appendChild(originalImgRef);
  return galleryItemRef;
};

const galleryCards = galleryItems.map((galleryItem) =>
  createGalleryItem(galleryItem)
);
refs.gallery.append(...galleryCards);

const OnImageClick = (event) => {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    console.log("Кликнули не по картинке");
    return;
  }

  updateImgSource(event.target);
  openModal();
};

const updateImgSource = (currentImg) => {
  const imgSource = currentImg.dataset.source;
  const imgDescription = currentImg.alt;
  refs.lightboxImg.src = `${imgSource}`;
  refs.lightboxImg.alt = `${imgDescription}`;
};

const openModal = () => {
  refs.lightbox.classList.add("is-open");
};

const onCloseBtnClick = () => {
  closeModal();
  resetImgSource(refs.lightboxImg);
};

const closeModal = () => {
  refs.lightbox.classList.remove("is-open");
};

const resetImgSource = (currentImg) => {
  if (currentImg) {
    refs.lightboxImg.src = "";
    refs.lightboxImg.alt = "";
  }
};

refs.gallery.addEventListener("click", OnImageClick);
refs.btnClose.addEventListener("click", onCloseBtnClick);
