import axios from "axios";
export const createPost = async (
  type,
  background,
  text,
  images,
  user,
  token
) => {
  try {
    const { data } = await axios.post(
      `http://localhost:5000/createPost`,
      {
        type,
        background,
        text,
        images,
        user,
      },
      
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const createPosts = async (
  type,
  background,
  text,
  images,
  user,
  token
) => {
  try {
    const { data } = await axios.post(
      `http://localhost:5000/createPost`,
      {
        type,
        background,
        text,
        images,
        user,
      },
      
    );
    return "ok";
  } catch (error) {
    return error.response.data.message;
  }
};

export const reactPost = async (postId, react, userId) => {
  try {
    console.log({
      postId,
      react,
      userId
    })
    const { data } = await axios.put(
      `http://localhost:5000/reactPosts`,
      {
        postId,
        react,
        userId
      }
    );
    console.login(data)
    return "ok";
  } catch (error) {
    return error.response.data.message;
  }
};

export const getReacts = async (postId, token) => {
  console.log(postId, token)
  try {
    const { data } = await axios.get(
      `http://localhost:5000/getReacts/${postId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    return data;
    
  } catch (error) {
    return error.response.data.message;
  }
};

export const comment = async (postId, comment, image, token) => {
  try {
    const { data } = await axios.put(
      `http://localhost:5000/comment`,
      {
        postId,
        comment,
        image,
      },

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};