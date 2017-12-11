using System;


namespace Academic.Models
{

    public class Enrollment
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string dateEnrollment { get; set; } = System.DateTime.Now.ToString("dd/MM/yyyy");
        public string Hour { get; set; } = System.DateTime.Now.ToShortTimeString();
        public Student student { get; set; }
        public Guid studentId {get; set;}
        public Classroom classroom { get; set; }
        public Guid classroomId {get; set;}
    }

}