/*****************************************************************
File: Main.js
Author:  Yanming Meng
Description: MAD9135 Assignment1
Version: 0.0.1
Updated: October 2, 2017
*****************************************************************/
//creating header
let creatHeader = React.createClass({
    propTypes: {}
    , render: function () {
        return (React.createElement('div', {
            className: 'header'
        }, React.createElement('h1', {}, 'Grocery List'), ));
    }
});
//creating nav menu
let createNavMenu = React.createClass({
    render: function () {
        return (React.createElement('ul', {
            className: 'nav-menu'
        }, React.createElement('li', {}, React.createElement('a', {
            href: '#'
        }, 'Grocery List')), React.createElement('li', {}, React.createElement('a', {
            href: '#newItem'
        }, 'Add New Item'))));
    }
});
//creating item list
let listItem = React.createClass({
    propTypes: {
        'id': React.PropTypes.number
        , 'name': React.PropTypes.string.isRequired
        , 'price': React.PropTypes.string.isRequired
        , 'isle': React.PropTypes.string.isRequired
    }
    , render: function () {
        return (React.createElement('li', {}, React.createElement('a', {
            className: 'nav-item-link'
            , href: '#/item/' + this.props.id
        }, React.createElement('h2', {
            className: 'list-item-name'
        }, this.props.name), React.createElement('div', {
            className: 'list-item-price'
        }, this.props.price))));
    }
});
let listItems = React.createClass({
    propTypes: {
        'items': React.PropTypes.array.isRequired
    }
    , render: function () {
        return (React.createElement('ul', {
            className: 'list-item-menu'
        }, this.props.items.map(i => React.createElement(listItem, i))));
    }
});
//creating main list page
let itemPage = React.createClass({
    propTypes: {
        'items': React.PropTypes.array.isRequired
    }
    , render: function () {
        return (React.createElement(listItems, {
            items: this.props.items
        }));
    }
});
//creating detail page
let itemDetails = React.createClass({
    propTypes: {
        'name': React.PropTypes.string.isRequired
        , 'price': React.PropTypes.string.isRequired
        , 'isle': React.PropTypes.string.isRequired
    }
    , render: function () {
        return (React.createElement('div', {
            className: 'list-item-menu-details'
        }, React.createElement('p', {
            className: 'list-name-details'
        }, this.props.name), React.createElement('p', {}, 'Price: ' + this.props.price), React.createElement('p', {}, 'At: isle' + this.props.isle)));
    }
});
//creating add item form
let addItemForm = React.createClass({
    propTypes: {
        'listItem': React.PropTypes.object.isRequired
        , 'onChange': React.PropTypes.func.isRequired
        , 'onAdd': React.PropTypes.func.isRequired
    }
    , onNameChange: function (e) {
        this.props.onChange(Object.assign({}, this.props.listItem, {
            name: e.target.value
        }));
    }
    , onPriceChange: function (e) {
        this.props.onChange(Object.assign({}, this.props.listItem, {
            price: e.target.value
        }));
    }
    , onIsleChange: function (e) {
        this.props.onChange(Object.assign({}, this.props.listItem, {
            isle: e.target.value
        }));
    }
    , onAdd: function () {
        this.props.onAdd(this.props.listItem);
    }
    , render: function () {
        return (React.createElement('form', {}, React.createElement('input', {
            type: 'text'
            , placeholder: 'Name'
            , value: this.props.listItem.name
            , onChange: this.onNameChange
        }), React.createElement('input', {
            type: 'text'
            , placeholder: 'Price'
            , value: this.props.listItem.price
            , onChange: this.onPriceChange
        }), React.createElement('input', {
            placeholder: 'Isle'
            , value: this.props.listItem.isle
            , onChange: this.onIsleChange
        }), React.createElement('button', {
            type: 'button'
            , onClick: this.onAdd
        }, 'Add')));
    }
});
//creating add item page
let addItem = React.createClass({
    propTypes: {
        'listItem': React.PropTypes.object.isRequired
        , 'onNewItemChange': React.PropTypes.func.isRequired
        , 'onAddNewItem': React.PropTypes.func.isRequired
    }
    , render: function () {
        return (React.createElement('div', {}, React.createElement(addItemForm, {
            listItem: this.props.listItem
            , onChange: this.props.onNewItemChange
            , onAdd: this.props.onAddNewItem
        })));
    }
});
//swich between contact list and add new contact form
let state = {};
let setState = function (changes) {
    let component;
    let componentProperties = {};
    Object.assign(state, changes);
    let splitUrl = state.location.replace(/^#\/?|\/$/g, '').split('/');
    switch (splitUrl[0]) {
    case 'item':
        {
            component = itemDetails;
            componentProperties = state.items.find(i => i.key == splitUrl[1]);
            break;
        }
    case 'newItem':
        {
            component = addItem;
            componentProperties = {
                listItem: state.listItem
                , onNewItemChange: function (item) {
                    setState({
                        listItem: item
                    });
                }
                , onAddNewItem: function (item) {
                    let itemList = state.items;
                    const newKey = itemList.length + 1;
                    itemList.push(Object.assign({}, {
                        key: newKey
                        , id: newKey
                    }, item));
                    setState({
                        items: itemList
                        , listItem: {
                            name: ''
                            , price: ''
                            , isle: ''
                        }
                    });
                }
            };
            break;
        }
    default:
        {
            component = itemPage;
            componentProperties = {
                items: state.items
            };
        }
    }
    let rootElement = React.createElement('div', {}, React.createElement(creatHeader, {}), React.createElement(createNavMenu, {}), React.createElement(component, componentProperties));
    ReactDOM.render(rootElement, document.getElementById('react-app'));
};
window.addEventListener('hashchange', () => setState({
    location: location.hash
}));
setState({
    listItem: {
        name: ''
        , price: ''
        , isle: ''
    }
    , location: location.hash
    , items: items
});