import UserModel from '../schemas/user.js';

class User {
  static async create({ newUser }) {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  }

  static async findByEmail({ email }) {
    const user = await UserModel.findOne({ email });
    return user;
  }

  static async findByMbti({ mbti }) {
    const user = await UserModel.find({ mbti });
    return user;
  }

  static async findById({ userId }) {
    const user = await UserModel.findById(userId);
    return user;
  }

  static async findByNickname({ nickname }) {
    const user = await UserModel.findOne({ nickname });
    return user;
  }

  static async findAll() {
    const users = await UserModel.find({});
    return users;
  }

  static async update({ userId, fieldToUpdate, newValue }) {
    const filter = { _id: userId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option,
    );
    return updatedUser;
  }

  static async delete({ userId }) {
    const user = await UserModel.findByIdAndUpdate(
      { _id: userId },
      { isOut: true },
      { new: true },
    );
    return user;
  }

  // 탈퇴한 회원조회
  static async findDeletedUsers() {
    const users = await User.find({ isOut: true });
    return users;
  }
}

export default User;
