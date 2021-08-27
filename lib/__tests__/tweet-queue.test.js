"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@aws-cdk/assert/jest");
const core_1 = require("@aws-cdk/core");
const __1 = require("..");
test('snapshot', () => {
    const app = new core_1.App();
    const stack = new core_1.Stack(app, 'test');
    new __1.TweetQueue(stack, 'MyQueue', {
        secretArn: 'secret-arn',
        query: 'twitter query',
    });
    const template = app.synth().getStack(stack.artifactId).template;
    expect(template).toMatchSnapshot();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdlZXQtcXVldWUudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInR3ZWV0LXF1ZXVlLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxnQ0FBOEI7QUFDOUIsd0NBQTJDO0FBQzNDLDBCQUFnQztBQUVoQyxJQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRTtJQUNwQixNQUFNLEdBQUcsR0FBRyxJQUFJLFVBQUcsRUFBRSxDQUFDO0lBQ3RCLE1BQU0sS0FBSyxHQUFHLElBQUksWUFBSyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUVyQyxJQUFJLGNBQVUsQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFO1FBQy9CLFNBQVMsRUFBRSxZQUFZO1FBQ3ZCLEtBQUssRUFBRSxlQUFlO0tBQ3ZCLENBQUMsQ0FBQztJQUVILE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQztJQUNqRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUM7QUFDckMsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ0Bhd3MtY2RrL2Fzc2VydC9qZXN0JztcbmltcG9ydCB7IEFwcCwgU3RhY2sgfSBmcm9tICdAYXdzLWNkay9jb3JlJztcbmltcG9ydCB7IFR3ZWV0UXVldWUgfSBmcm9tICcuLic7XG5cbnRlc3QoJ3NuYXBzaG90JywgKCkgPT4ge1xuICBjb25zdCBhcHAgPSBuZXcgQXBwKCk7XG4gIGNvbnN0IHN0YWNrID0gbmV3IFN0YWNrKGFwcCwgJ3Rlc3QnKTtcblxuICBuZXcgVHdlZXRRdWV1ZShzdGFjaywgJ015UXVldWUnLCB7XG4gICAgc2VjcmV0QXJuOiAnc2VjcmV0LWFybicsXG4gICAgcXVlcnk6ICd0d2l0dGVyIHF1ZXJ5JyxcbiAgfSk7XG5cbiAgY29uc3QgdGVtcGxhdGUgPSBhcHAuc3ludGgoKS5nZXRTdGFjayhzdGFjay5hcnRpZmFjdElkKS50ZW1wbGF0ZTtcbiAgZXhwZWN0KHRlbXBsYXRlKS50b01hdGNoU25hcHNob3QoKTtcbn0pOyJdfQ==