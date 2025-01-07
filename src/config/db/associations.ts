import Admin from "../../modules/admins/v1/admins.model";
import Consultant from "../../modules/consultant/v1/consultant.model";
import Contractor from "../../modules/contractor/v1/contractor.model";
import Department from "../../modules/departments/v1/departments.model";
import Employee from "../../modules/employees/v1/employees.model";
import Otp from "../../modules/otp/v1/otp.model";
import Project from "../../modules/project/v1/projects.model";
import ProjectRequest from "../../modules/projectRequests/v1/projectsRequest.model";
import Role from "../../modules/roles/v1/roles.model";
import ProjectEngineers from "../../shared/junctionTables/projectEmployees.model";
import ProjectSubContractors from "../../shared/junctionTables/projectsSubContractors.mode";



const setupAssociations = () => {
    Admin.hasOne(Otp, {
        foreignKey: "adminId", // Foreign key in Otp table referencing Admin table
        onDelete: "CASCADE", // Cascade delete OTP when admin is deleted
    });
    Employee.hasOne(Otp, {
        foreignKey: "employeeId", // Foreign key in Otp table referencing Admin table
        onDelete: "CASCADE", // Cascade delete OTP when admin is deleted
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    Consultant.hasOne(Otp, {
        foreignKey: "consultantId", // Foreign key in Otp table referencing Admin table
        onDelete: "CASCADE", // Cascade delete OTP when admin is deleted
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    Role.belongsTo(Department, {
        foreignKey: "departmentId", // Foreign key in Otp table referencing Admin table
        onDelete: "CASCADE", // Cascade delete OTP when admin is deleted
    });
    Department.hasMany(Role, {
        foreignKey: "departmentId", // Foreign key in Otp table referencing Admin table
        onDelete: "CASCADE"

    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    Employee.belongsTo(Role, {
        foreignKey: "roleId", // Foreign key in Otp table referencing Admin table
        onDelete: "CASCADE", // Cascade delete OTP when admin is deleted
    });
    Role.hasMany(Employee, {
        foreignKey: "roleId", // Foreign key in Otp table referencing Admin table
        onDelete: "CASCADE"

    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Project aassociations
    Project.belongsTo(Contractor, {
        foreignKey: 'contractorId',
        as: 'mainContractor',
    });
    Contractor.hasMany(Project, {
        foreignKey: 'contractorId',
        as: 'mainContractor',
    })
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Subcontractor Relationship (One-to-One)
    Contractor.belongsToMany(Project, {
        foreignKey: 'contractorId',
        as: 'subContractors',
        through: ProjectSubContractors

    });
    Project.belongsToMany(Contractor, {
        foreignKey: 'projectId',
        as: 'subContractors',
        through: ProjectSubContractors

    });
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    Project.belongsTo(Employee, {
        foreignKey: 'managerId',
        as: 'manager',
    });
    Employee.hasMany(Project, {
        foreignKey: 'managerId',
        as: 'manager',
    })
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    Project.belongsTo(Consultant, {
        foreignKey: 'consultantId',
        as: 'consultant',
    });
    Consultant.hasMany(Project, {
        foreignKey: 'consultantId',
        as: 'consultant',
    })
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    Project.belongsToMany(Employee, {
        foreignKey: 'projectId',
        as: 'engineers',
        through: ProjectEngineers
    });
    Employee.belongsToMany(Project, {
        foreignKey: 'engineerId',
        as: 'engineers',
        through: ProjectEngineers

    })

    // Project aassociations
    ProjectRequest.belongsTo(Project, {
        foreignKey: 'projectId',
    });
    Project.hasMany(ProjectRequest, {
        foreignKey: 'projectId',
    })
    ///////////////////////////////////////
    ProjectRequest.belongsTo(Employee, {
        foreignKey: 'createdByEmployee',
    });
    Employee.hasMany(ProjectRequest, {
        foreignKey: 'createdByEmployee',
    })
    ///////////////////////////////////////
    ProjectRequest.belongsTo(Admin, {
        foreignKey: 'createdByAdmin',
    });
    Admin.hasMany(ProjectRequest, {
        foreignKey: 'createdByAdmin',
    })
}

export default setupAssociations;