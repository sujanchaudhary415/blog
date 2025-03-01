import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    synopsis: {
      type: String,
      required: true,
    },
    aired: {
      type: String,
      required: true,
    },
    image: {
      type:String,
    },
    score: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
    comments: [
      {
        text: {
          type: String,
          required: true,
        },
        createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

postSchema.methods.addLike = async function (userId) {
  if (this.likes.includes(userId)) {
    return { message: "You already liked this post" };
  }
  this.likes.push(userId);
  await this.save();
  return { message: "Post liked successfully" };
};

postSchema.methods.removeLike = async function (userId) {
  if (!this.likes.includes(userId)) {
    return { message: "You did not like this post" };
  }
  this.likes = this.likes.filter((id) => id.toString() !== userId.toString());
  await this.save();
  return { message: "Post unliked successfully" };
};

postSchema.methods.addComment = async function (commentData) {
  this.comments.push(commentData);
  await this.save();
  return { message: "Comment added successfully" };
};

const postModel = mongoose.model("Post", postSchema);

export default postModel;
