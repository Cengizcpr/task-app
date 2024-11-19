export default (sequelize, DataTypes) => {
  const Task = sequelize.define(
    'Task',
    {
      task_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false, 
      },
      description: {
        type: DataTypes.STRING(100),
        allowNull: true, 
      },
      due_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('pending', 'in_progress', 'completed'),
        allowNull: false,
        defaultValue: 'pending',
      },
      user_id: {
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'user_id',
        },
        onDelete: 'CASCADE', 
      },
    },
    {
      tableName: 'tasks', 
      timestamps: true,
    }
  );

  return Task;
};
