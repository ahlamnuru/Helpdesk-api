const { grabAllcomments } = require("../models/comments.model");

module.exports.attachComments = async (tickets) => {
  //iterate on every tickets
  // for each ticket id grab all comments that have that id
  // add comments property to attach the returned rows of the comments
  try {
    await Promise.all(
      tickets.map(async (element) => {
        const comment = await grabAllcomments(element.id);
        element.comments = comment || [];
      }),
    );
    return tickets;
  } catch (error) {
    throw new Error("Error somting went wrong ");
  }
};
