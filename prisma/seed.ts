import { PrismaService } from '../src/prisma.service';
import { hash } from 'bcrypt';
import { PERMISSIONS } from '../src/utils/constants/permissions.constant';

async function seedDatabase() {
  const prisma = new PrismaService();

  try {
    console.log('🌱 Starting database seeding...');

    // Delete existing data (in reverse order due to foreign keys)
    console.log('🧹 Cleaning existing data...');
    await prisma.user.deleteMany();
    await prisma.rolePermission.deleteMany();
    await prisma.permission.deleteMany();
    await prisma.role.deleteMany();

    // Create permissions
    const permissions = [
      // User permissions
      { name: 'Create User', nameCode: PERMISSIONS.CREATE_USER },
      { name: 'Read User', nameCode: PERMISSIONS.READ_USER },
      { name: 'Update User', nameCode: PERMISSIONS.UPDATE_USER },
      { name: 'Delete User', nameCode: PERMISSIONS.DELETE_USER },

      // Role permissions
      { name: 'Create Role', nameCode: PERMISSIONS.CREATE_ROLE },
      { name: 'Read Role', nameCode: PERMISSIONS.READ_ROLE },
      { name: 'Update Role', nameCode: PERMISSIONS.UPDATE_ROLE },
      { name: 'Delete Role', nameCode: PERMISSIONS.DELETE_ROLE },

      // Permission permissions
      { name: 'Create Permission', nameCode: PERMISSIONS.CREATE_PERMISSION },
      { name: 'Read Permission', nameCode: PERMISSIONS.READ_PERMISSION },
      { name: 'Update Permission', nameCode: PERMISSIONS.UPDATE_PERMISSION },
      { name: 'Delete Permission', nameCode: PERMISSIONS.DELETE_PERMISSION },
      { name: 'Assign Permissions', nameCode: PERMISSIONS.ASSIGN_PERMISSIONS },

      // Post permissions
      { name: 'Create Post', nameCode: PERMISSIONS.CREATE_POST },
      { name: 'Read Post', nameCode: PERMISSIONS.READ_POST },
      { name: 'Update Post', nameCode: PERMISSIONS.UPDATE_POST },
      { name: 'Delete Post', nameCode: PERMISSIONS.DELETE_POST },

      // Comment permissions
      { name: 'Create Comment', nameCode: PERMISSIONS.CREATE_COMMENT },
      { name: 'Read Comment', nameCode: PERMISSIONS.READ_COMMENT },
      { name: 'Update Comment', nameCode: PERMISSIONS.UPDATE_COMMENT },
      { name: 'Delete Comment', nameCode: PERMISSIONS.DELETE_COMMENT },

      // Category permissions
      { name: 'Create Category', nameCode: PERMISSIONS.CREATE_CATEGORY },
      { name: 'Read Category', nameCode: PERMISSIONS.READ_CATEGORY },
      { name: 'Update Category', nameCode: PERMISSIONS.UPDATE_CATEGORY },
      { name: 'Delete Category', nameCode: PERMISSIONS.DELETE_CATEGORY },
    ];

    console.log('📝 Creating permissions...');
    const createdPermissions = await Promise.all(
      permissions.map((permission) =>
        prisma.permission.create({ data: permission }),
      ),
    );

    // Create roles
    console.log('👥 Creating roles...');
    const adminRole = await prisma.role.create({
      data: {
        name: 'ADMIN',
        description: 'Administrator with full system access',
      },
    });

    const editorRole = await prisma.role.create({
      data: {
        name: 'EDITOR',
        description: 'Editor with content management access',
      },
    });

    const userRole = await prisma.role.create({
      data: {
        name: 'USER',
        description: 'Regular user with limited access',
      },
    });

    const guestRole = await prisma.role.create({
      data: {
        name: 'GUEST',
        description: 'Guest user with read-only access',
      },
    });

    // Assign permissions to roles
    console.log('🔗 Assigning permissions to roles...');

    // Admin gets all permissions
    const adminPermissions = createdPermissions.map((permission) => ({
      roleId: adminRole.id,
      permissionId: permission.id,
    }));
    await prisma.rolePermission.createMany({ data: adminPermissions });

    // Editor gets content-related permissions
    const editorPermissionCodes = [
      PERMISSIONS.READ_USER,
      PERMISSIONS.CREATE_POST,
      PERMISSIONS.READ_POST,
      PERMISSIONS.UPDATE_POST,
      PERMISSIONS.DELETE_POST,
      PERMISSIONS.CREATE_COMMENT,
      PERMISSIONS.READ_COMMENT,
      PERMISSIONS.UPDATE_COMMENT,
      PERMISSIONS.DELETE_COMMENT,
      PERMISSIONS.CREATE_CATEGORY,
      PERMISSIONS.READ_CATEGORY,
      PERMISSIONS.UPDATE_CATEGORY,
      PERMISSIONS.DELETE_CATEGORY,
    ];
    const editorPermissions = createdPermissions
      .filter((p) => editorPermissionCodes.includes(p.nameCode as any))
      .map((permission) => ({
        roleId: editorRole.id,
        permissionId: permission.id,
      }));
    await prisma.rolePermission.createMany({ data: editorPermissions });

    // User gets basic permissions
    const userPermissionCodes = [
      PERMISSIONS.READ_USER,
      PERMISSIONS.UPDATE_USER, // can update their own profile
      PERMISSIONS.CREATE_POST,
      PERMISSIONS.READ_POST,
      PERMISSIONS.UPDATE_POST, // can update their own posts
      PERMISSIONS.CREATE_COMMENT,
      PERMISSIONS.READ_COMMENT,
      PERMISSIONS.UPDATE_COMMENT, // can update their own comments
      PERMISSIONS.READ_CATEGORY,
    ];
    const userPermissions = createdPermissions
      .filter((p) => userPermissionCodes.includes(p.nameCode as any))
      .map((permission) => ({
        roleId: userRole.id,
        permissionId: permission.id,
      }));
    await prisma.rolePermission.createMany({ data: userPermissions });

    // Guest gets only read permissions
    const guestPermissionCodes = [
      PERMISSIONS.READ_POST,
      PERMISSIONS.READ_COMMENT,
      PERMISSIONS.READ_CATEGORY,
    ];
    const guestPermissions = createdPermissions
      .filter((p) => guestPermissionCodes.includes(p.nameCode as any))
      .map((permission) => ({
        roleId: guestRole.id,
        permissionId: permission.id,
      }));
    await prisma.rolePermission.createMany({ data: guestPermissions });

    // Create test users
    console.log('👤 Creating test users...');

    // Create admin user
    const adminPassword = await hash('admin123456', 10);
    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@example.com',
        password: adminPassword,
        name: 'System Administrator',
        phone: '+1234567890',
        status: 'ACTIVE',
        roleId: adminRole.id,
        reminders: [],
      },
    });

    // Create regular user
    const userPassword = await hash('user123456', 10);
    const testUser = await prisma.user.create({
      data: {
        email: 'user@example.com',
        password: userPassword,
        name: 'Test User',
        phone: '+0987654321',
        status: 'ACTIVE',
        roleId: userRole.id,
        reminders: [],
      },
    });

    // Create editor user
    const editorPassword = await hash('editor123456', 10);
    const editorUser = await prisma.user.create({
      data: {
        email: 'editor@example.com',
        password: editorPassword,
        name: 'Content Editor',
        phone: '+1122334455',
        status: 'ACTIVE',
        roleId: editorRole.id,
        reminders: [],
      },
    });

    // Create guest user
    const guestPassword = await hash('guest123456', 10);
    const guestUser = await prisma.user.create({
      data: {
        email: 'guest@example.com',
        password: guestPassword,
        name: 'Guest User',
        phone: '+5566778899',
        status: 'ACTIVE',
        roleId: guestRole.id,
        reminders: [],
      },
    });

    console.log('✅ Database seeding completed successfully!');
    console.log(`
🎉 Summary:
📊 Roles Created:
  - ADMIN (${adminRole.id}): ${adminPermissions.length} permissions
  - EDITOR (${editorRole.id}): ${editorPermissions.length} permissions
  - USER (${userRole.id}): ${userPermissions.length} permissions
  - GUEST (${guestRole.id}): ${guestPermissions.length} permissions

📝 Permissions Created: ${createdPermissions.length} total

👥 Users Created:
  - Admin User (${adminUser.id}): admin@example.com / admin123456
  - Editor User (${editorUser.id}): editor@example.com / editor123456
  - Regular User (${testUser.id}): user@example.com / user123456
  - Guest User (${guestUser.id}): guest@example.com / guest123456

🚀 You can now start testing the RBAC system!
`);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run if called directly
if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export { seedDatabase };
