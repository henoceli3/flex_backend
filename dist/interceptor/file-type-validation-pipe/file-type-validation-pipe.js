"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileTypeValidationPipe = void 0;
class FileTypeValidationPipe {
    transform(value) {
        const acceptedFileTypes = ['image/png', 'image/jpg', 'image/jpeg'];
        return acceptedFileTypes.includes(value.mimetype);
    }
}
exports.FileTypeValidationPipe = FileTypeValidationPipe;
//# sourceMappingURL=file-type-validation-pipe.js.map