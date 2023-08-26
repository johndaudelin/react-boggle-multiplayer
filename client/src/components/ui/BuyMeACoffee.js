import React from "react";
import "../../stylesheets/BuyMeACoffee.scss";

export default class BuyMeACoffee extends React.Component {
  render() {
    return (
      <div id="buyMeACoffee" className="buyMeACoffeeContainer">
        <a href="https://www.buymeacoffee.com/jdaudelin" target="_blank">
          <img
            class="buyMeACoffeeImage"
            src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=jdaudelin&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff"
          />
        </a>
      </div>
    );
  }
}
