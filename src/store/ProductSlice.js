import { createSlice, current } from "@reduxjs/toolkit";
import data from "../data";

const ProductSlice = createSlice({
  name: "feedback",
  initialState: {
    mainData: data,
    data: data,
    category: [],
    status: {},
    isLoading: true,
  },
  reducers: {
    initialLoad: (state, action) => {
      state.isLoading = true;
      if(localStorage.getItem('data')) {
          state.mainData = JSON.parse(localStorage.getItem('data'));
      } else {
        localStorage.setItem("data", JSON.stringify(data));
        state.mainData = data;
      }
      state.isLoading = false;
    },
    loadData: (state, action) => {
      state.isLoading = true;
      state.mainData = state.mainData = JSON.parse(localStorage.getItem('data'));
      state.data = state.mainData;
      let tempCategory = state.data.productRequests.map(
        (item) => item.category
      );
      tempCategory = ["all", ...tempCategory];
      tempCategory = new Set(tempCategory);
      state.category = [...tempCategory];

      let tempStatus = {};
      state.data.productRequests.forEach((item) => {
        if (tempStatus[item.status]) {
          tempStatus[item.status]++;
        } else {
          tempStatus[item.status] = 1;
        }
      });
      state.status = tempStatus;
      state.isLoading = false;
    },
    filterItem: (state, action) => {
      if (action.payload.type === "filter") {
        if (action.payload.value === "all") {
          state.data = state.mainData;
        } else {
          const temp = state.data.productRequests.filter(
            (item) => item.category === action.payload.value
          );
          state.data.productRequests = temp;
        }
      } else {
      }
    },
    sortItem: (state, action) => {
      const mostUpvotes = (a, b) => {
        return a.upvotes > b.upvotes ? -1 : 1;
      };

      const leastUpvotes = (a, b) => {
        return a.upvotes < b.upvotes ? -1 : 1;
      };

      const mostComments = (a, b) => {
        return a.comments.length > b.comments.length ? -1 : 1;
      };

      const leastComments = (a, b) => {
        return a.comments.length < b.comments.length ? -1 : 1;
      };

      if (action.payload === "Random") {
        state.data = state.mainData;
      } else if (action.payload === "Most Upvotes") {
        const temp = state.data.productRequests;
        temp.sort(mostUpvotes);
      } else if (action.payload === "Least Upvotes") {
        const temp = state.data.productRequests;
        temp.sort(leastUpvotes);
      } else if (action.payload === "Most Comments") {
        const temp = state.data.productRequests;
        temp.sort(mostComments);
      } else {
        const temp = state.data.productRequests;
        temp.sort(leastComments);
      }
    },
    upvote: (state, action) => {
      state.mainData.productRequests.map((item) => {
        if (item.id === action.payload.id) {
          item.upvotes += action.payload.value;
          item.is_upvoted += action.payload.value;
          return item;
        }
        return item;
      });
      localStorage.setItem('data', JSON.stringify(state.mainData));
    },
    addFeedback: (state, action) => {
      const { title, detail, category } = action.payload;
      state.mainData.productRequests.push({
        id: state.mainData.productRequests.length + 1,
        title,
        category: category.toLowerCase(),
        upvotes: 0,
        is_upvoted: 0,
        status: "suggestion",
        description: detail,
        comments: [],
      });
      localStorage.setItem('data', JSON.stringify(state.mainData));
    },
    addComment: (state, action) => {
      const { id, comment } = action.payload;
      state.mainData.productRequests.map((item) => {
        if (item.id == id) {
          item.comments.push({
            id: item.comments.length,
            content: comment,
            user: state.mainData.currentUser,
            replies: [],
          });
          return item;
        }
        return item;
      });
      localStorage.setItem('data', JSON.stringify(state.mainData));
    },
    addReply: (state, action) => {
      const { parentID, id, reply, replyingTo } = action.payload;
      state.mainData.productRequests.map((item) => {
        if (item.id == parentID) {
          item.comments.map((value) => {
            if (value.id == id) {
              value.replies.push({
                content: reply,
                replyingTo,
                user: state.mainData.currentUser,
              });
              return value;
            }
            return value;
          });
          return item;
        }
        return item;
      });
      localStorage.setItem('data', JSON.stringify(state.mainData));
    },
  },
});

export const ProductAction = ProductSlice.actions;

export default ProductSlice;
