<template>
    <DirectoryManager class="directory">
        <template #categories="categoriesProps">
            <div class="directory-part">
                <h1>
                    Companies
                </h1>
                <Input v-model="searchFilters.category" placeholder="Search..."/>
                <List>
                    <ListItem 
                    v-for="(category, idx) in categoriesProps.categories
                    .filter(cat => cat.toLowerCase().includes(searchFilters.category.toLowerCase()))"
                    :selected="categoriesProps.selected === category" 
                    @click="categoriesProps.onselect(category)"
                    >
                        {{ category }}
                    </ListItem>
                </List>
                <Button class="remove-btn" style="float: right;" :disabled="!(!!categoriesProps.selected)" @click.stop="categoriesProps.ondelete">Remove</Button>
            </div>
        </template>
        <template #departments="departmentProps">
            <div class="directory-part" v-show="!!departmentProps.category">
                <h1>
                    Departments
                </h1>
                <Input v-model="searchFilters.department" placeholder="Search..."/>
                <List>
                    <ListItem 
                    v-for="(department, idx) in departmentProps.departments?.filter(dep => dep.toLowerCase().includes(searchFilters.department.toLowerCase()))" 
                    :selected="departmentProps.selected === department" 
                    @click="departmentProps.onselect(department)"
                    >
                        {{ department }}
                    </ListItem>
                </List>
                <Button class="remove-btn" style="float: right;" :disabled="!(!!departmentProps.selected)" @click.stop="departmentProps.ondelete">Remove</Button>
            </div>
        </template>
        <template #employees="employeeProps">
            <div class="directory-part" v-show="!!employeeProps.department">
                <h1>
                    Employees
                </h1>
                <div style="display: flex;">
                    <Input style="display: inline-block" v-model="searchFilters.employee" placeholder="Search..."/>
                    <Button class="dir-add-btn" @click="employeeProps.onadd">Add</Button>
                </div>
                <List>
                    <ListItem 
                    v-for="(employee, idx) in employeeProps.employees?.filter(emp => emp.toLowerCase().includes(searchFilters.employee.toLowerCase()))"
                    :selected="employeeProps.selected === employee"
                    @click="employeeProps.onselect(employee)"
                    >
                        {{ employee }}
                    </ListItem>
                </List>
                <Button class="remove-btn" style="float: right;" :disabled="!(!!employeeProps.selected)" @click.stop="employeeProps.ondelete">Remove</Button>
            </div>
        </template>
    </DirectoryManager>
</template>

<script setup>
    import { reactive } from 'vue';
    import Input from '../form/Input.vue';
    import List from '../list/List.vue';
    import ListItem from '../list/ListItem.vue';
    import DirectoryManager from './DirectoryManager.vue';
    import Button from '../form/Button.vue';

    const searchFilters = reactive({
        category: '',
        department: '',
        employee: ''
    })
</script>

<style scoped>
    .directory {
        margin: 12px 0px;
        display: grid;
        flex-direction: row;
    }
    .directory-part {
        background-color: #1f1e1e;
        outline-offset: -10px;
        outline: 1px solid #2d966e;
        color: white;
        padding: 8px 24px;
    }

    .directory-part h1 {
        margin: 12px 0px 16px 0px;
        text-align: center;
        color: #2d966e;
        font-size: 32px;
        text-decoration: underline;
        font-weight: 600;
        font-style: italic;
    }

    .input:focus-within label {
        color: white;
    }

    .remove-btn {
        margin: 12px 0px;
        background-color: transparent !important;
        border: 1px solid #ff5500;
        color: #ff5500;
        transition: all 0.15s ease-in;
    }

    .remove-btn:enabled:hover {
        color: #ff7834 !important;
        border: 1px solid #ff7834;
    }
    .remove-btn:disabled {
        background-color: transparent;
        border: 1px solid #f881604a;
        color: #f881604a;
        cursor: not-allowed;
    }

    .dir-add-btn {
        padding: 6px 12px;
        margin-top: 0px;
        margin-bottom: 0px;
        margin-left: auto;
        background-color: transparent;
        border: 1px solid #2d966e;
        color: #2d966e;
        transition: all 0.3s ease-in-out;
    }

    .dir-add-btn:hover {
        background-color: transparent !important;
        border: 1px solid white;
        color: white !important;
    }
</style>