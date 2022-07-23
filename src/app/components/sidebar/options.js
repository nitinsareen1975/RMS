import React from "react";
import { 
  DashboardOutlined, 
  UserOutlined, 
  ExperimentOutlined,
  AuditOutlined,
  AimOutlined,
  FileSearchOutlined,
  CreditCardOutlined,
  GroupOutlined
} from '@ant-design/icons';

const adminOptions = [{
    key: "/admin",
    label: "Dashboard",
    roles: ["Administrator"],
    leftIcon: <DashboardOutlined />
  },
  {
    key: "/admin/all-patients",
    label: "View All Patients",
    roles: ["Administrator"],
    leftIcon: <AimOutlined />
  },
  {
    key: "/admin/group-concierge",
    label: "Group Concierge",
    roles: ["Administrator"],
    leftIcon: <GroupOutlined />,
    children: [
      {
        key: "/admin/group-concierge/group-events",
        label: "All Events",
        roles: ["Administrator"]
      },
      {
        key: "/admin/group-concierge/add-group-event",
        label: "Add New Group Event",
        roles: ["Administrator"]
      },
      {
        key: "/admin/group-concierge/group-patients",
        label: "Pre-registration List",
        roles: ["Administrator"]
      },
      {
        key: "/admin/group-concierge/concierge-results",
        label: "Concierge Results",
        roles: ["Administrator"]
      }
    ]
  },
  {
    key: "/admin/labs",
    label: "Manage Labs",
    roles: ["Administrator"],
    leftIcon: <ExperimentOutlined />,
    children: [
      {
        key: "/admin/labs",
        label: "Manage Labs",
        roles: ["Administrator"]
      },
      {
        key: "/admin/labs/add",
        label: "Add New Lab",
        roles: ["Administrator"]
      }
    ]
  },
  {
    key: "/admin/pricing",
    label: "Manage Pricing",
    leftIcon: <CreditCardOutlined />,
    roles: ["Administrator"],
    children: [
      {
        key: "/admin/pricing",
        label: "View Pricing",
        roles: ["Administrator"]
      },
      {
        key: "/admin/pricing/add",
        label: "Add new pricing",
        roles: ["Administrator"]
      }
    ]
  },
  {
    key: "/admin/test-types",
    label: "Manage Tests",
    roles: ["Administrator"],
    leftIcon: <AuditOutlined />,
    children: [
      {
        key: "/admin/test-types",
        label: "View All Tests",
        roles: ["Administrator"]
      },
      {
        key: "/admin/test-types/add",
        label: "Add New Test",
        roles: ["Administrator"]
      },
      {
        key: "--hr--"
      },
      {
        key: "/admin/test-type-methods",
        label: "Observation Definitions",
        roles: ["Administrator"]
      },
      {
        key: "/admin/test-type-names",
        label: "Test Types",
        roles: ["Administrator"]
      },
      {
        key: "/admin/test-result-types",
        label: "Result Types",
        roles: ["Administrator"]
      }
    ]
  },
  /* {
    key: "/admin/test-type-names",
    label: "Manage Test Types",
    roles: ["Administrator"],
    leftIcon: <DeploymentUnitOutlined />,
    children: [
      {
        key: "/admin/test-type-names",
        label: "View All",
        roles: ["Administrator"]
      },
      {
        key: "/admin/test-type-names/add",
        label: "Add New Type",
        roles: ["Administrator"]
      },
      {
        key: "/admin/test-type-names/add",
        label: "Observation Definitions",
        roles: ["Administrator"]
      }
    ]
  }, */
  {
    key: "/admin/users",
    label: "Manage Users",
    leftIcon: <UserOutlined />,
    roles: ["Administrator"],
    children: [
      {
        key: "/admin/users",
        label: "All Users",
        roles: ["Administrator"]
      },
      {
        key: "/admin/users/add",
        label: "Add new user",
        roles: ["Administrator"]
      }
    ]
  },
  {
    key: "/admin/reports",
    label: "Reports",
    leftIcon: <FileSearchOutlined />,
    roles: ["Administrator"],
    children: [
      /* {
        key: "/admin/reports/test-results",
        label: "Test Results",
        roles: ["Administrator"]
      }, */
      {
        key: "/admin/reports/all",
        label: "All Reports",
        roles: ["Administrator"]
      },
      {
        key: "/admin/reports/revenue",
        label: "Revenue",
        roles: ["Administrator"]
      }
    ]
  }
];

const labAdminOptions = [{
    key: "/lab",
    label: "Dashboard",
    roles: ["Lab Admin", "Doctor", "Nurse", "Medical Assistant", "Clerk"],
    leftIcon: <DashboardOutlined />
  },
  {
    key: "/lab/patients",
    label: "Manage Patients",
    leftIcon: <AimOutlined />,
    roles: ["Lab Admin", "Doctor", "Nurse", "Medical Assistant", "Clerk"],
    children: [
      {
        key: "/lab/patients",
        label: "Scheduled List",
        roles: ["Lab Admin", "Doctor", "Nurse", "Medical Assistant", "Clerk"]
      },
      {
        key: "/lab/patients/checkedin",
        label: "CheckedIn List",
        roles: ["Lab Admin", "Doctor", "Nurse", "Medical Assistant", "Clerk"]
      },
      {
        key: "/lab/patients/pending-results",
        label: "Pending Results",
        roles: ["Lab Admin", "Doctor", "Nurse", "Medical Assistant", "Clerk"]
      },
      {
        key: "/lab/patients/completed",
        label: "Completed",
        roles: ["Lab Admin", "Doctor", "Nurse", "Medical Assistant", "Clerk"]
      },
      {
        key: "--hr--"
      },
      {
        key: "/lab/patients/add",
        label: "Create New Patient",
        roles: ["Lab Admin", "Doctor", "Nurse", "Medical Assistant", "Clerk"]
      }
    ]
  },
  {
    key: "/lab/users",
    label: "Manage Users",
    leftIcon: <UserOutlined />,
    roles: ["Lab Admin"],
    children: [
      {
        key: "/lab/users",
        label: "Manage Users",
        roles: ["Lab Admin"]
      },
      {
        key: "/lab/users/add",
        label: "Add new user",
        roles: ["Lab Admin"]
      }
    ]
  },
  {
    key: "/lab/reports",
    label: "Reports",
    leftIcon: <FileSearchOutlined />,
    roles: ["Lab Admin", "Doctor", "Nurse", "Medical Assistant", "Clerk"],
    children: [
      {
        key: "/lab/reports/all",
        label: "All Reports",
        roles: ["Lab Admin", "Doctor", "Nurse", "Medical Assistant", "Clerk"]
      }
    ]
  }
];

export default {
  adminOptions,
  labAdminOptions
};