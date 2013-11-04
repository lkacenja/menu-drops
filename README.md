A simple menu script for creating drop down and click to drop menus with Drupal's default menu block structure. Drop down mode requires <a href="http://cherne.net/brian/resources/jquery.hoverIntent.html">Hover Intent</a> by Brian Cherne. To use simply create a menu block in Drupal's block interface. Then create a simple script in your theme.

To attach:
<code>
  $('#menu').menuDrops();
</code>

To detach:
<code>
  $('#menu').menuDropsRemove();
</code>

Optionally, send params:
<code>
  $('#menu').menuDrops({
    mode: 'mouseover', // mouseover or click
    onConstruct: function() {}, // Optional after construct callback
    onDestruct: function() {}, // Optional after destruct callback
    onOpen: function() {}, // Optional callback when an item is activated
    onClose: function() {}, // Optional callback when an item is deactivated
  });
</div>
