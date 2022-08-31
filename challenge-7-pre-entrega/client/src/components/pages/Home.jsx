const Home = () => {
  return (
    <>
      <section className="section products">
        <div className="section__header">
          <h2>Mi stock</h2>
          <a href="/Productos">
            Ver todos <i className="feather icon-arrow-right"></i>
          </a>
        </div>
        <div className="section__body products__list">
          <article className="card__product">
            <a href="/:id"></a>
            <picture className="card__product__img">
              <img
                src="https://i.ibb.co/1G0F6rw/campera.webp"
                alt="Imagen del producto"
              />
            </picture>
            <h3 className="card__product__title">Jacket Bomber</h3>
          </article>
          <article className="card__product">
            <a href="/:id"></a>
            <picture className="card__product__img">
              <img
                src="https://i.ibb.co/Jq4bPGY/shirt-yellow.webp"
                alt="Imagen del producto"
              />
            </picture>
            <h3 className="card__product__title">Remera Phenomenally</h3>
          </article>
          <article className="card__product">
            <a href="/:id"></a>
            <picture className="card__product__img">
              <img
                src="https://images.unsplash.com/photo-1630590613173-b01fdb40a1eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                alt="Imagen del producto"
              />
            </picture>
            <h3 className="card__product__title">Remera Ejemplo</h3>
          </article>
          <article className="card__product">
            <a href="/:id"></a>
            <picture className="card__product__img">
              <img
                src="https://images.unsplash.com/photo-1630590613173-b01fdb40a1eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                alt="Imagen del producto"
              />
            </picture>
            <h3 className="card__product__title">Remera Ejemplo</h3>
          </article>
        </div>
      </section>
    </>
  );
};

export default Home;
