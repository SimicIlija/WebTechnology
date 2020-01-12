/*
function make_draggable(evt) {
    var svg = evt.target;
    svg.addEventListener('mousedown', startDrag);
    svg.addEventListener('mousemove', drag);
    svg.addEventListener('mouseup', endDrag);
    svg.addEventListener('mouseleave', endDrag);

   

    var selectedElement, offset, transform;
    function startDrag(evt) {
      if (evt.target.classList.contains('piece')) {
        selectedElement = evt.target;
        offset = getMousePosition(evt);
        // Get all the transforms currently on this element
        var transforms = selectedElement.transform.baseVal;
        // Ensure the first transform is a translate transform
        if (transforms.length === 0 ||
            transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
          // Create an transform that translates by (0, 0)
          var translate = svg.createSVGTransform();
          translate.setTranslate(0, 0);
          // Add the translation to the front of the transforms list
          selectedElement.transform.baseVal.insertItemBefore(translate, 0);
        }
        // Get initial translation amount
        transform = transforms.getItem(0);
        offset.x -= transform.matrix.e;
        offset.y -= transform.matrix.f;
      }
    }

    function drag(evt) {
      if (selectedElement) {
        evt.preventDefault();
        var coord = getMousePosition(evt);
        transform.setTranslate(coord.x - offset.x, coord.y - offset.y);
      }
    }

    function endDrag(evt) {
        //transform.matrix.e = place_in_valid(transform.matrix.e, selectedElement)
        //transform.matrix.f = place_in_valid(transform.matrix.f, selectedElement)
        console.log("old_id: " + selectedElement.id)

        new_x = String.fromCharCode(selectedElement.id[0].charCodeAt(0) + Math.floor(transform.matrix.e / 90))
        selectedElement.id = selectedElement.id.replaceAt(0, new_x)

        new_y = String.fromCharCode(selectedElement.id[1].charCodeAt(0) + Math.floor(transform.matrix.f / 90))
        selectedElement.id = selectedElement.id.replaceAt(1, new_y)

        console.log("new_id: " + selectedElement.id)

        selectedElement = null;

    }

    function getMousePosition(evt) {
      var CTM = svg.getScreenCTM();
      return {
        x: (evt.clientX - CTM.e) / CTM.a,
        y: (evt.clientY - CTM.f) / CTM.d
      };
    }

    function place_in_valid(x, element, d) {
        quotient = Math.floor(x/90)
        remainder = mod(x, 90)
        if(remainder >= 45) {
            if (quotient < 0) {
                quotient -= 1
            } else {
                quotient += 1
            }
        }
        

        return quotient * 90
    }
}

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

*/