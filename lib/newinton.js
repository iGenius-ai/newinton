import * as SecureStore from 'expo-secure-store';

const BASE_URL = "https://newinton-backend-service.onrender.com";

// Register user
export const signUp = async (email, password, fullName, phoneNumber, referrer, selectedAdvert) => {
  const requestPayload = {
    email,
    password,
    meta_data: {
      fullName,
      phoneNumber
    },
    referrer: selectedAdvert.name === 'word-of-mouth' ? referrer : undefined,
    referrer_source: selectedAdvert.name
  };

  try {
    const response = await fetch(`${BASE_URL}/api/v1/accounts/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestPayload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'An error occurred during signup');
    }

    return data;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

// Sign In
export const signIn = async (email, password, fcmToken) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/accounts/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, fcm_token: fcmToken }),
    });

    // Now try to parse as JSON
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'An error occurred during signin');
    }

    // Store the JWT token
    await SecureStore.setItemAsync('userToken', data.data.token);
    return data;
  } catch (error) {
    // console.error('Error during sign in:', error);
    throw error;
  }
};

// Get Current User
export async function getCurrentUser() {
  try {
    const token = await SecureStore.getItemAsync('userToken');

    if (!token) {
      return null;
    }

    const response = await fetch(`${BASE_URL}/api/v1/accounts`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch user data');
    }

    return data.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
}

// Request Password Reset
export async function requestPasswordReset(email) {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/accounts/request-password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'An error occurred during password reset request');
    }
    return data;
  } catch (error) {
    console.error('Error during password reset request:', error);
    throw error;
  }
}

// Reset Password
export async function resetPassword(email, otp, newPassword, confirmPassword) {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/accounts/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        otp,
        newPassword,
        confirmPassword,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to reset password');
    }
    return data;
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
}

// Sign Out
export async function signOut() {
  try {
    // Clear the token from SecureStore
    await SecureStore.deleteItemAsync('userToken');
    return true;
  } catch (error) {
    console.error('Error during logout:', error);
    return false;
  }
}

// Upload File
export async function uploadFile(file, type) {
  if (!file) return;

  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };

  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

// Get File Preview
export async function getFilePreview(fileId, type) {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

// Create Video Post
export async function createVideoPost(form) {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    );

    return newPost;
  } catch (error) {
    throw new Error(error);
  }
}

// Get all video Posts
export async function getAllPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collectionId
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Get video posts created by user
export async function getUserPosts(userId) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collectionId,
      [Query.equal("username", userId)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Get video posts that matches search query
export async function searchPosts(query) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collectionId,
      [Query.search("title", query)]
    );

    if (!posts) throw new Error("Something went wrong");

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Get latest created video posts
export async function getLatestPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}
