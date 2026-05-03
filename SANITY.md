## Sanity Tests

### Auth
| Test | Description |
|------|-------------|
| Create User | Creates a new user with the `basic` role |
| Edit Username | Updates username or email |
| Basic Access | Logs in, and verifies `basic` access |
| Admin Access | Upgrades role to `admin`, logs in, and verifies `admin` access |
| Super Access | Upgrades role to `super`, logs in, and verifies `super` access |
| Change Password | Updates the user's password |
| Old Password Login | Login with old password — expected to fail |
| New Password Login | Login with new password — expected to succeed |

### Dashboard
| Test | Description |
|------|-------------|
| Pie Chart | Calibration pie chart renders correctly |
| Pending Table | Pending Table renders correctly |

### View
| Test | Description |
|------|-------------|
| Equipment Table | Table loads with complete data |
| Single Item | Opens and displays full equipment info |
| Item History | Opens and displays equipment changelog table |
| Column Filters | Column filters apply correctly |
| Item Filters | Item filters apply correctly |
| Search | Search returns expected results |
| Data Extract | Export respects active filters, filename is correct, and file is viewable |
| Certificate | Certificate opens and is viewable |

### History
| Test | Description |
|------|-------------|
| Changelog Table | Opens with complete data |
| Certificate | Certificate opens and is viewable |

### Equipment CRUD
| Test | Description |
|------|-------------|
| Add Item | Add new item with all fields; verify in View |
| Edit Item | Edit existing item; verify changes in View |
| Delete Item | Delete item; confirm removal |
| Search | Search returns expected results |

### Calibration
| Test | Description |
|------|-------------|
| Pending Item | Set calibration date to yesterday, wait ~5 mins, reload dashboard — item should appear in pending table |

### Routes
| Test | Description |
|------|-------------|
| Not Found | Navigate to a non-existent path; Should show NotFound component |
| Unauthorized | Navigate to `/users` using basic role; Should redirect to `/unauthorized` and show Unauthorized component |