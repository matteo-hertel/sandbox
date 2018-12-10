---
title: 'About'
date: 2018-12-01T21:24:43Z
draft: False
---

this is what is about
big fuck off icon!!
<iron-icon icon="search"></iron-icon>
<iron-icon icon="icons:3d-rotation"></iron-icon>
<iron-icon icon="icons:accessibility"></iron-icon>
<iron-icon icon="icons:accessible"></iron-icon>
<iron-icon icon="icons:account-balance"></iron-icon>
<iron-icon icon="icons:account-balance-wallet"></iron-icon>
<iron-icon icon="icons:account-box"></iron-icon>
<iron-icon icon="icons:account-circle"></iron-icon>
<iron-icon icon="icons:add"></iron-icon>
<iron-icon icon="icons:add-alert"></iron-icon>
<iron-icon icon="icons:add-box"></iron-icon>
<iron-icon icon="icons:add-circle"></iron-icon>
<iron-icon icon="icons:add-circle-outline"></iron-icon>
<iron-icon icon="icons:add-shopping-cart"></iron-icon>
<iron-icon icon="icons:alarm"></iron-icon>
<iron-icon icon="icons:alarm-add"></iron-icon>
<iron-icon icon="icons:alarm-on"></iron-icon>
<iron-icon icon="icons:all-out"></iron-icon>
<iron-icon icon="icons:android"></iron-icon>
<iron-icon icon="icons:announcement"></iron-icon>
<iron-icon icon="icons:archive"></iron-icon>
<iron-icon icon="icons:arrow-back"></iron-icon>
<iron-icon icon="icons:arrow-downward"></iron-icon>
<iron-icon icon="icons:arrow-drop-down"></iron-icon>
<iron-icon icon="icons:arrow-drop-down-circle"></iron-icon>
<iron-icon icon="icons:arrow-forward"></iron-icon>
<iron-icon icon="icons:arrow-upward"></iron-icon>
<iron-icon icon="icons:aspect-ratio"></iron-icon>

{{< components >}}
<simple-button type="raised" color="primary">Click me</simple-button>

<paper-card heading="Emmental" image="http://placehold.it/350x150/FFC107/000000" alt="Emmental">
      <div class="card-content">
        Emmentaler or Emmental is a yellow, medium-hard cheese that originated in the area around Emmental, Switzerland. It is one of the cheeses of Switzerland, and is sometimes known as Swiss cheese.
      </div>
      <div class="card-actions">
        <paper-button>Share</paper-button>
        <paper-button>Explore!</paper-button>
      </div>
    </paper-card>
    <paper-progress style='width:100%' indeterminate class="blue"></paper-progress>
    <paper-progress indeterminate class="slow red"></paper-progress>
    <paper-progress value="40" secondary-progress="80"></paper-progress>
  <div>
      <paper-button id="btn">Status</paper-button>
      <paper-badge
          icon="favorite"
          for="btn"
          label="favorite icon">
      </paper-badge>
    </div>

    <div>
      <paper-icon-button
          id="account-box"
          icon="account-box"
          alt="account-box">
      </paper-icon-button>
      <paper-badge
          icon="social:mood"
          for="account-box"
          label="mood icon">
      </paper-badge>
    </div>

<paper-button class="pink">link</paper-button>
<paper-button raised class="custom indigo">raised</paper-button>
<paper-button toggles raised class="custom green">toggles</paper-button>
<paper-button disabled class="custom disabled">disabled</paper-button>
<custom-style>

  <style>
    paper-button.custom {
      --paper-button-ink-color: green;
      /* These could also be individually defined for each of the
        specific css classes, but we'll just do it once as an example */
      --paper-button-flat-keyboard-focus: {
        background-color: var(--paper-pink-a200) !important;
        color: white !important;
      };
      --paper-button-raised-keyboard-focus: {
        background-color: var(--paper-pink-a200) !important;
        color: white !important;
      };
    }
    paper-button.custom:hover {
      background-color: var(--paper-indigo-100);
    }
    paper-button.pink {
      color: var(--paper-pink-a200);

    }
    paper-button.indigo {
      background-color: var(--paper-indigo-500);
      color: white;
      --paper-button-raised-keyboard-focus: {
        background-color: var(--paper-pink-a200) !important;
        color: white !important;
      };
    }
    paper-button.green {
      background-color: var(--paper-green-500);
      color: white;
    }
    paper-button.green[active] {
      background-color: var(--paper-red-500);
    }
    paper-button.disabled {
      color: white;
      background-color: bisque;
    }
  </style>

{{< /components >}}
