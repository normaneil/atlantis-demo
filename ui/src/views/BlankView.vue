<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import Swal from "sweetalert2";
import { addComment, updateComment, deleteComment } from "../api/index";
import { useMainStore } from "../stores/main";
import type { Comment } from "../entities/entities";

const store = useMainStore();
const message = ref("");
const comment_id = ref("");

const handleConfirm = () => {
  Swal.fire({
    title:
      "<span style='font-size: 24px !important;'>Would you like to save your changes?</span>",
    showCancelButton: true,
    confirmButtonText: "Save"
  }).then((result) => {
    if (result.isConfirmed) {
      handleSubmit();
    }
  });
};

const handleSubmit = () => {
  const user_id = localStorage.getItem("user_id");
  if (user_id) {
    if (comment_id.value) {
      const payload = {
        message: message.value
      };

      updateComment(comment_id.value, payload)
        .then((response) => {
          // console.log(response);
          Swal.fire("Updated!", "Successfully updated", "success");
          message.value = "";
          comment_id.value = "";

          store.getComments();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const payload = {
        message: message.value,
        user_id: user_id
      };

      addComment(payload)
        .then((response) => {
          if (response.success) {
            Swal.fire("Saved!", "Successfully saved", "success");
            message.value = "";
            comment_id.value = "";
            store.getComments();
          } else {
            Swal.fire(
              "Error",
              "Something went wrong. Please try again",
              "error"
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
};

const handleEdit = (item: Comment) => {
  // console.log("handleEdit", item);
  message.value = item.message;
  comment_id.value = `${item.id}`;
};

const handleDelete = (item: Comment) => {
  Swal.fire({
    title:
      "<span style='font-size: 24px !important;'>Are you sure you want to delete this comment?</span>",
    showCancelButton: true,
    confirmButtonText: "Proceed"
  }).then((result) => {
    if (result.isConfirmed) {
      deleteComment(item.id)
        .then((response) => {
          if (response.success) {
            Swal.fire("Deleted", "Comment deleted", "info");
            message.value = "";
            comment_id.value = "";
            store.getComments();
          } else {
            Swal.fire(
              "Error",
              "Something went wrong. Please try again",
              "error"
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
};

const isAdmin = computed(() => {
  return localStorage.getItem("user_is_admin") &&
    localStorage.getItem("user_is_admin") == "0"
    ? false
    : true;
});

onMounted(() => {
  store.getComments();
});
</script>

<template>
  <form method="post" @submit.prevent="handleConfirm">
    <div class="text-lg font-bold">Demo</div>

    <div class="mt-5">
      <label for="message" class="block mb-2 text-sm font-medium text-gray-900"
        >Your comment</label
      >
      <textarea
        id="message"
        v-model="message"
        rows="4"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Write your thoughts here..."
        required
      ></textarea>
    </div>
    <div class="mt-3">
      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
      >
        Submit
      </button>
    </div>

    <div>
      <hr />

      <div
        v-for="(item, index) in store.comments"
        :key="index"
        class="bg-white border border-gray-200 rounded-lg shadow md:flex-row p-5 text-sm mb-3"
      >
        <div>
          <blockquote class="text-lg italic font-normal text-gray-900">
            <p>{{ item.message }}</p>
          </blockquote>
        </div>
        <div class="text-xs">{{ item.created_at }}</div>
        <div v-if="isAdmin">
          <a
            href="#"
            class="font-bold text-xs text-blue-600 hover:underline mr-5"
            @click.prevent="handleEdit(item)"
            title="Edit"
          >
            Edit
          </a>

          |

          <a
            href="#"
            class="font-bold text-xs text-red-600 hover:underline ml-5"
            @click.prevent="handleDelete(item)"
            title="Delete"
          >
            Delete
          </a>
        </div>
      </div>
    </div>
  </form>
</template>
