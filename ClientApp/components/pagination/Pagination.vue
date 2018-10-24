<template>
    <ul class="pagination d-flex justify-content-center">
        <li class="page-item" v-bind:class="{ disabled: paginationData.leftArrow.disabled }">
            <router-link :to="getPath(paginationData.leftArrow.pageNumber)" class="page-link">&laquo;</router-link>
        </li>

        <li v-for="page in paginationData.pages" class="page-item" v-bind:class="{ active: page.current }">
            <router-link :to="getPath(page.number)" class="page-link">{{page.text}}</router-link>
        </li>

        <li class="page-item" v-bind:class="{ disabled: paginationData.rightArrow.disabled }">
            <router-link :to="getPath(paginationData.rightArrow.pageNumber)" class="page-link">&raquo;</router-link>
        </li>
    </ul>
</template>

<script>
    export default {
        props: {
            page: {
                type: Number,
                required: true
            },
            totalPages: {
                type: Number,
                required: true
            },
            disabled: {
                type: Boolean,
                default: false
            },
            pathName: {
                type: String,
                required: false
            }
        },
        computed: {
            paginationData() {
                let pagination = {
                    leftArrow: { disabled: false, pageNumber: 0 },
                    rightArrow: { disabled: false, pageNumber: 0 },
                    pages: []
                };

                if (this.page <= 1) {
                    pagination.leftArrow.disabled = true;
                }
                else {
                    pagination.leftArrow.pageNumber = this.page - 1;
                }
                if (this.page >= this.totalPages) {
                    pagination.rightArrow.disabled = true;
                }
                else {
                    pagination.rightArrow.pageNumber = this.page + 1;
                }

                if (this.totalPages < 8) {
                    for (let i = 1; i <= this.totalPages; i++) {
                        pagination.pages.push({
                            text: i.toString(), number: i, current: this.page === i ? true : false
                        });
                    }
                }
                else {
                    if (this.page <= 4) {
                        for (let i = 1; i <= 5; i++) {
                            pagination.pages.push({
                                text: i.toString(), number: i, current: this.page === i ? true : false
                            });
                        }
                        pagination.pages.push({ text: '...', number: 6, current: false });
                        pagination.pages.push({ text: this.totalPages.toString(), number: this.totalPages, current: false });
                    }
                    else if (this.totalPages - this.page <= 3) {
                        pagination.pages.push({ text: '1', number: 1, current: false });
                        pagination.pages.push({ text: '...', number: this.totalPages - 5, current: false });
                        for (let i = 4; i >= 0; i--) {
                            let currPage = this.totalPages - i;
                            pagination.pages.push({
                                text: currPage.toString(),
                                number: currPage,
                                current: currPage === this.page ? true : false
                            });
                        }
                    }
                    else {
                        pagination.pages.push({ text: '1', number: 1, current: false });
                        pagination.pages.push({ text: '...', number: this.page - 2, current: false });
                        pagination.pages.push({ text: (this.page - 1).toString(), number: this.page - 1, current: false });
                        pagination.pages.push({ text: this.page.toString(), number: this.page, current: true });
                        pagination.pages.push({ text: (this.page + 1).toString(), number: this.page + 1, current: false });
                        pagination.pages.push({ text: '...', number: this.page + 2, current: false });
                        pagination.pages.push({ text: this.totalPages.toString(), number: this.totalPages, current: false });
                    }
                }
                return pagination;
            }
        },
        methods: {
            getPath(page) {
                if (!this.pathName) {
                    return {
                        path: page.toString(),
                        query: this.$route.query
                    };
                }
                return {
                    name: this.pathName,
                    params: { page: page.toString() },
                    query: this.$route.query
                };
            }
        }
    };
</script>

<style>
    .page-link {
        transition: all 600ms;
    }
</style>