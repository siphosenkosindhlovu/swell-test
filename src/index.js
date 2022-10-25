import "./styles.css";
import swell from "swell-js";

const options = {
  useCamelCase: true
};
swell.init("complete-3d", "pk_A7DQXggvIr5P5XKj7czDxxqI1ZyTt18H", options);

window.swell = swell;

async function getProducts() {
  return await swell.products.list();
}

const btn = document.querySelector("button");

const ids = [
  "6280d52966d9cf00127ae2d3",
  "5e31e67be53f9a59d89600f1",
  "6280d3c054638300121609ba"
];

async function getProductsByIds(ids) {
  const productList = ids.map((id) => swell.products.get(id));
  console.log({ productList });
  const response = await Promise.all(productList);
  console.log(response);
}
let page = 1;
btn.addEventListener("click", async function (e) {
  console.log("fetching");
  // const productList = ids.map((id) => swell.products.get(id));
  const response = await swell.products
    .list({ limit: 24, page: page })
    .catch((error) => ({
      error: JSON.stringify(error)
    }));
  page++;
  const categories = await swell.categories.list();
  const category = await swell.categories.get("makerbot");
  const attributes = await swell.attributes.list();
  const filters = await swell.products.filters(response);
  console.log({ filters, attributes, categories, category });
});
