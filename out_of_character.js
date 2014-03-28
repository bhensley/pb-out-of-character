/**
 * Out of Character - ProBoards Plugin
 * Version 0.0.1
 * Keys Used: Post
 *
 * Written by Bob Hensley (bob@bobbyhensley.com)
 *
 * Licensed under GNU General Public (GPL) Version 2
 * See http://choosealicense.com/licenses/gpl-v2/ for license details
 */

$(function () {
  (function () {
    return {

      /**
       * Is the current post out of character?
       *
       * @type Boolean
       */
      is_ooc: false,

      /**
       * Route the application
       *
       * @return void
       */
      init: function () {
        switch (pb.data('route').name) {
          case 'new_post':
            this.build_new_post();
            break;

          case 'thread':
            this.loop_posts();
            break;
        }
      },

      /**
       * Set the new button for toggle OOC and configure the PB
       * key to be set on new post.
       *
       * @return void
       */
      build_new_post: function () {
        var self = this;

        $('td > div.controls').append('<a class="button" id="ooc-button" role="button">Out of Character</a>');
        
        $('#ooc-button').click(function () {
          if ($(this).css('font-weight') === 'bold') {
            $(this).css('font-weight', '');
          } else {
            $(this).css('font-weight', 'bold');
          }

          self.is_ooc = !self.is_ooc; // Toggle
        });

        $('span.float-right > input[value="Create Post"]').click (function () {
          pb.plugin.key('ooc_status').set_on('post_new', self.is_ooc);
        });
      },

      /**
       * Loop through posts on the page, grabbing each ID
       * and check to see if it's OOC or not. If so, pass off
       * to helper method.
       *
       * @return void
       */
      loop_posts: function () {
        var self = this;

        $('tr[id^="post-"').each(function () {
          var pId = $(this).attr('id').match(/post-(\d+)/)[1];

          if(self.post_is_ooc(pId)) {
            self.indicate_ooc(this);
          }
        });
      },

      /**
       * Post is OOC, do something to make that obvious.
       *
       * @return void
       */
      indicate_ooc: function (elem) {
        // Do something here
      },

      /**
       * Check to see if the post ID has a true value in the key
       *
       * @return Boolean
       */
      post_is_ooc: function (id) {
        return pb.plugin.key('ooc_status').get(id);
      }

    }
  })().init();
});