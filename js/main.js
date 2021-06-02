

$(function () { // a short-hand for: $(document).ready(function() { ... });
    // ensure that the function is called once all the DOM elements
    // of the page are ready to be used.

    function horizontal_vad(_axis) {

           str = "<tr>"
         for (i = 0; i < data.SENTENCES.length; i++) {
            map = {'V':data.V[i], 'A':data.A[i], 'D':data.D[i] }
            axis = map[_axis]
            color_v = constants.COLOR_VAD[axis]
            color_v = Utils.updateColor(color_v.substring(1))
            var v_tag = '<td style="background-color:' + color_v + ';color:' + color_v + '";>11</td>'
            str = str + v_tag
         }
         str = str + "</tr>"
         return str
    }

    // horizontal display
    function horizontal_view() {
           // V line
         str =  horizontal_vad('V')
         $("#horizontal_view").append(str);

           // A line
         str =  horizontal_vad('A')
         $("#horizontal_view").append(str);

         // D line
         str =  horizontal_vad('D')
         $("#horizontal_view").append(str);

         // Emotions
         str = "<tr>"
         for (i = 0; i < data.SENTENCES.length; i++) {
            emotion = data.EMOTIONS[i]
            emotion_string = constants.EMOTION_DICT2[emotion]
            var emotion_image_tag = '<img src="' + constants.IMAGE_DIR + '/' + emotion_string + '.png" width="15" height="15">'
            str = str + '<td style="background-color:#FFFFFF;">' + emotion_image_tag + "</td>"
         }
         str = str + "</tr>"
         $("#horizontal_view").append(str);
     }

    // vertical display
    function vertical_view(sentence_index) {
        $("#vertical_view").empty();
        for (i = 0; i < data.SENTENCES.length; i++) {
            sentence = data.SENTENCES[i]
            emotion = data.EMOTIONS[i]
            emotion_string = constants.EMOTION_DICT2[emotion]
            V = data.V[i]
            A =  data.A[i]
            D =  data.D[i]
            var emotion_image_tag = '<img src="' + constants.IMAGE_DIR + '/' + emotion_string + '.png" width="15" height="15">'
            color_v = constants.COLOR_VAD[V]
            color_a = constants.COLOR_VAD[A]
            color_d = constants.COLOR_VAD[D]
            color_v = Utils.updateColor(color_v.substring(1))
            color_a = Utils.updateColor(color_a.substring(1))
            color_d = Utils.updateColor(color_d.substring(1))

            var v_tag = '<td style="background-color:' + color_v + ';color:'+ color_v + ';">11</td>'
            var a_tag = '<td style="background-color:' + color_a + ';color:'+ color_a + ';">11</td>'
            var d_tag = '<td style="background-color:' + color_d + ';color:'+ color_d + ';">11</td>'

            str = '<tr>'
            if ( (sentence_index !== null) && (sentence_index === i)) {
                str = '<tr style="background-color:#ffc107;">'
            }
            str += '<td style="background-color:#FFFFFF;">' + emotion_image_tag + "</td>"
            + v_tag
            + a_tag
            + d_tag
             + "<td>" + sentence + "</td>"
            + "</tr>"
            $("#vertical_view").append(str);
        }
    }

    horizontal_view();
    vertical_view();

    //$( "#horizontal_view" ).click(function() {
    //    alert( "Handler for .click() called." );

    $("#horizontal_view tr:has(td)").mouseover(function(e) {
         $(this).css("cursor", "pointer");
    });

    $("#horizontal_view tr:has(td)").click(function(e) {
         $("#horizontal_view td").removeClass("highlight");
         var clickedCell= $(e.target).closest("td");
         //clickedCell.addClass("highlight");
         var cell_index = e.target.cellIndex
         vertical_view(cell_index);
         //$("#spnText").html('Clicked table cell value is: <b> ' + clickedCell.text() + '</b>');
    });

});