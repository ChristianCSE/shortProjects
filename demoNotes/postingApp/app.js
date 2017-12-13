

class ProductList extends React.Component {
  state = {products  : []};
  //binds seeding data to this (this = our component)
  componentDidMount(){
    this.setState({ products: Seed.products });
  }

  //property initializer syntax (avoid using constructors to bind this)
  handleProductUpVote = (productId) => {
    const nextProducts = this.state.products.map((product)=>{
      if(product.id === productId){
        return Object.assign({}, product, {
          votes: product.votes + 1
        });
      } else{
        return product;
      }
    });
    this.setState({products : nextProducts});
  }

  //render() is a react api method
  render(){
    const products = this.state.products.sort((a,b)=>( -1*(a.votes-b.votes)));
    const productComponents = products.map((product) =>(
      <Product 
        key = {'uniqueKey-'+ product.id}
        id = {product.id}
        title = {product.title}
        description = {product.description}
        url = {product.url}
        votes = {product.votes}
        submitterAvatarUrl = {product.submitterAvatarUrl}
        productImageUrl = {product.productImageUrl}
        onVote = {product.onVote}
      />
    ));
    //note: we still need to encapsulate this inside some html 
    //note: we are using className="" and NOT class=""
    return (
      <div className = "ui unstackable items">
        {productComponents}
      </div>
    );
  }
}

class Product extends React.Component {
  //can use property initalizer to avoid constructor & this binding
  handleUpVote = () => {
    this.props.onVote(this.props.id);
  }
  render(){
    return (
      <div className='item'>
        
        <div className='image'>
          <img src = {this.props.productImageUrl} />
        </div>

        <div className='middle aligned content'>
          <div className='header'>
            {/*note that the this.method isn't invoked until we actually click on it*/}
            <a onClick={this.handleUpVote}>
              <i className='large caret up icon' />
            </a>
          </div>
          <div className='description'>
            <a href={this.props.url}> {this.props.title} </a>
            <p> {this.props.description} </p>
          </div>
          <div className='extra'>
            <span> Submitted by: </span>
            <img className='ui avatar image' src={this.props.submitterAvatarUrl} />
          </div>
        </div>

      </div>
    );
  }
}


ReactDOM.render(
  <ProductList />,
  document.getElementById('content')
);

