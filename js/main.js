

$(function () { // a short-hand for: $(document).ready(function() { ... });
    // ensure that the function is called once all the DOM elements
    // of the page are ready to be used.

    // horizontal display
    function horizontal_view() {
           // V line
           str = "<tr>"
         for (i = 0; i < data.SENTENCES.length; i++) {
            V = data.V[i]
            color_v = constants.COLOR_VAD[V]
            var v_tag = '<td style="background-color:' + color_v + ';color:' + color_v + '";>11</td>'
            str = str + v_tag
         }
         str = str + "</tr>"
         $("#horizontal_view").append(str);

           // A line
           str = "<tr>"
         for (i = 0; i < data.SENTENCES.length; i++) {
            V = data.A[i]
            color_v = constants.COLOR_VAD[V]
            var v_tag = '<td style="background-color:' + color_v + ';color:' + color_v + '";>11</td>'
            str = str + v_tag
         }
         str = str + "</tr>"
         $("#horizontal_view").append(str);

         // D line
           str = "<tr>"
         for (i = 0; i < data.SENTENCES.length; i++) {
            V = data.D[i]
            color_v = constants.COLOR_VAD[V]
            var v_tag = '<td style="background-color:' + color_v + ';color:' + color_v + '";>11</td>'
            str = str + v_tag
         }
         str = str + "</tr>"
         $("#horizontal_view").append(str);

         // Emotions
         str = "<tr>"
         for (i = 0; i < data.SENTENCES.length; i++) {
            emotion = data.EMOTIONS[i]
            emotion_string = constants.EMOTION_DICT2[emotion]
            var emotion_image_tag = '<img src="' + constants.IMAGE_DIR + '/' + emotion_string + '.png" width="15" height="15">'
            str = str + "<td>" + emotion_image_tag + "</td>"
         }
         str = str + "</tr>"
         $("#horizontal_view").append(str);
     }

    // vertical display
    function vertical_view() {
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
            var v_tag = '<td style="background-color:' + color_v + ';color:'+ color_v + ';">11</td>'
            var a_tag = '<td style="background-color:' + color_a + ';color:'+ color_a + ';">11</td>'
            var d_tag = '<td style="background-color:' + color_d + ';color:'+ color_d + ';">11</td>'

            str = "<tr>"
            + "<td>" + emotion_image_tag + "</td>"
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

});