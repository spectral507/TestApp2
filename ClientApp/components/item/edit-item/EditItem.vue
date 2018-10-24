<template>
    <div class="row">
        <form class="mx-auto col-md-8 col-lg-7 col-xl-6" @submit="onSubmit">
            <div class="form-group">
                <label for="id">Id</label>
                <input class="form-control" type="text" name="id" id="id" v-model="todo.id" disabled />
            </div>
            <div class="form-group">
                <label for="description">Todo:</label>
                <textarea class="form-control" :class="descriptionClass" @input="onInput" type="text" name="description" id="description" v-model="todo.description" />
                <div class="text-danger" v-for="error in todoErrors.description">
                    <small>{{error}}</small>
                </div>
            </div>
            <div class="form-check">
                <label class="form-check-label" for="done">
                    <input class="form-check-input" type="checkbox" name="done" id="done" v-model="todo.done" /> Done
                </label>
            </div>
            <div class="text-center">
                <button class="btn btn-primary" type="submit">{{mode === 'create' ? 'Create' : 'Save'}}</button>
                <router-link class="btn btn-light" :to="returnUrl">Cancel</router-link>
            </div>
        </form>
    </div>
</template>

<script>
    import swal from 'sweetalert';

    export default {
        name: 'EditItemComponent',
        data: function () {
            return {
                mode: 'create',
                returnUrl: '/',
                todo: {
                    id: null,
                    description: null,
                    done: false
                },
                todoErrors: {
                    description: [
                    ]
                },
                descriptionClass: {
                    'is-invalid': false
                }
            };
        },
        created() {
            if (this.$route.name === 'create') {
                this.mode = 'create';
            }
            else if (this.$route.name === 'edit') {
                this.mode = 'edit';
                if (this.$route.params['id']) {
                    let id = parseInt(this.$route.params['id']);
                    if (!isNaN(id)) {
                        this.id = id;
                        let item = this.$store.state.items.find(item => item.id === id);
                        if (item) {
                            this.todo.id = item.id;
                            this.todo.description = item.description;
                            this.todo.done = item.done;
                        }

                    }
                }
            }
            if (this.$route.query['return']) {
                this.returnUrl = this.$route.query['return'];
            }
        },
        methods: {
            return() {
                if (this.return) {
                    this.$router.push(this.return);
                }
                else {
                    this.$router.push('/items');
                }
            },
            async onSubmit(e) {
                e.preventDefault();
                if (this.todoErrors.description.length > 0) {
                    return;
                }
                else {
                    if (this.mode === 'create') {
                        await this.$store.dispatch('createItem', {
                            description: this.todo.description.trim(),
                            done: this.todo.done
                        });
                        await swal({
                            title: 'Todo created',
                            text: this.todo.description,
                            icon: 'success',
                            confirm: {
                                text: "OK",
                                value: true,
                                visible: true,
                                className: "btn btn-primary",
                                closeModal: true
                            }
                        });
                        this.$router.push(this.returnUrl);
                    }
                    else if (this.mode === 'edit') {
                        await this.$store.dispatch('editItem', {
                            id: this.todo.id,
                            description: this.todo.description.trim(),
                            done: this.todo.done
                        });
                        await swal({
                            title: 'Todo updated',
                            text: this.todo.description,
                            icon: 'success',
                            confirm: {
                                text: "OK",
                                value: true,
                                visible: true,
                                className: "btn btn-primary",
                                closeModal: true
                            }
                        });
                        this.$router.push(this.returnUrl);
                    }
                }
            },
            onInput() {
                this.todoErrors.description = [];
                this.descriptionClass['is-invalid'] = false;
                if (this.todo.description.trim().length === 0) {
                    this.todoErrors.description.push('Value is required');
                    this.descriptionClass['is-invalid'] = true;
                }
            }
        }
    };
</script>