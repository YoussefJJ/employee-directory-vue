import { beforeEach, expect, vi } from "vitest";
import { useDirectory } from "./useDirectory";
import axios from "axios";
import { flushPromises, mount } from "@vue/test-utils";
import { defineComponent, nextTick } from "vue";

const TestComponent = defineComponent({
    setup (props) {
      return {...useDirectory()}
    }
})

describe("useDirectory", () => {
    beforeEach(() => {
        vi.spyOn(axios, 'get').mockResolvedValue({
            data: [
            {
                categoryName: "Category 1",
                departments: [
                    {
                        departmentName: "Department 1",
                        employees: ["John Doe"]
                    }
                ]
            }
        ]})
    });

    it("should delete an employee from the directory", async () => {
        const wrapper = mount(TestComponent)
        await flushPromises();

        wrapper.vm.selectCategory("Category 1")
        wrapper.vm.selectDepartment("Department 1")
        wrapper.vm.selectEmployee("John Doe")

        wrapper.vm.deleteEmployee("Category 1", "Department 1", "John Doe");
        expect(wrapper.vm.employees).not.toContain("John Doe");
        expect(wrapper.vm.selectedEmployee).toBeNull();
    });

    it("should add an employee to the directory", async () => {
        const wrapper = mount(TestComponent)
        await flushPromises();
        
        wrapper.vm.selectCategory("Category 1")
        wrapper.vm.selectDepartment("Department 1")
        wrapper.vm.addEmployee("Category 1", "Department 1", "Jane Doe");        

        expect(wrapper.vm.employees).toContain("Jane Doe");
    });

    it("should select a category", () => {
        const { selectCategory, selectedCategory } = useDirectory();
        selectCategory("Category 1");
        expect(selectedCategory.value).toBe("Category 1");
    });

    it("should select a department", () => {
        const { selectDepartment, selectedDepartment } = useDirectory();
        selectDepartment("Department 1");
        expect(selectedDepartment.value).toBe("Department 1");
    });

    it("should select an employee", () => {
        const { selectEmployee, selectedEmployee } = useDirectory();
        selectEmployee("John Doe");
        expect(selectedEmployee.value).toBe("John Doe");
    });

    it("should delete a category from the directory", async () => {
        const wrapper = mount(TestComponent)
        await flushPromises();

        wrapper.vm.selectCategory("Category 1")
        wrapper.vm.selectDepartment("Department 1")
        wrapper.vm.selectEmployee("John Doe")
        await wrapper.vm.$nextTick()

        wrapper.vm.deleteCategory("Category 1");
        expect(wrapper.vm.categories).not.toContain("Category 1");
        expect(wrapper.vm.selectedDepartment).toBeNull();
    });

    it("should delete a department from the directory", async () => {
        const wrapper = mount(TestComponent)
        await flushPromises();

        wrapper.vm.selectCategory("Category 1");
        wrapper.vm.selectDepartment("Department 1");
        wrapper.vm.selectEmployee("John Doe");
        await wrapper.vm.$nextTick()

        wrapper.vm.deleteDepartment("Category 1", "Department 1");

        expect(wrapper.vm.departments).not.toContain("Department 1");
        expect(wrapper.vm.selectedDepartment).toBeNull();
    });
});
