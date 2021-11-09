$(document).ready(function () {
    // Init
    $('.image-section').hide();
    $('.loader').hide();
    $('#result').hide();
    $('#tv').hide();


    // Upload Preview
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imageUpload").change(function () {
        $('.image-section').show();
        $('#btn-predict').show();
        $('#result').text('');
        $('#result').hide();
        readURL(this);
    });

    // Predict
    $('#btn-predict').click(function () {
        var form_data = new FormData($('#upload-file')[0]);

        // Show loading animation
        $(this).hide();
        $('.loader').show();

        // Make prediction by calling api /predict
        $.ajax({
            type: 'POST',
            url: '/predict',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                if (data == "Deseased") {
                    // Get and display the result
                $('.loader').hide();
                $('#result').fadeIn(600);
                // $('#result').html('<h3 style="color: #28a745;">Sakit</h3>');
                     // Make prediction by calling api /check
                $.ajax({
                    type: 'POST',
                    url: '/check',
                    data: form_data,
                    contentType: false,
                    cache: false,
                    processData: false,
                    async: true,
                    success: function (data) {
                        if (data == "Blast") {
                            // Get and display the result
                        $('.loader').hide();
                        $('#result').fadeIn(600);
                        $('#result').html('<h3 style="color: #dc3545;">Blast</h3>');
                        $('#btn-diseased').hide();
                        $('#tv').hide();
                        $('#gejala').show();
                        $('#kendali').show();
                        $('#gejala').html('<h4 style="color: #dc3545;">Gejala</h4><p style="color: #000;">Busuknya ujung tangkai malai yang disebut busuk leher (neck rot). Tangkai malai yang busuk mudah patah dan menyebabkan gabah hampa. Pada gabah yang sakit terdapat bercak-bercak kecil yang bulat. Penularan penyakit terutama terjadi melalui konidia yang terbawa angin</p>');
                        $('#kendali').html('<h4 style="color: #dc3545;">Pengendalian</h4><p>1. Gunakan benih sehat</p><p>2. Hidarkan penggunaan pupuk nitrogen diatas dosis anjuran</p><p>3. Pemakaian kompos sebagai sumber bahan organik</p><p>4. Hindarkan jarak tanam rapat (sebar langsung)</p><p>5. Hindarkan tanam padi dengan varietas yang sama terus menerus sepanjang tahun</p>');
                    console.log('Success!');
                        } else if (data == "Brown_Spot") {
                            // Get and display the result
                        $('.loader').hide();
                        $('#result').fadeIn(600);
                        $('#btn-diseased').hide();
                        $('#tv').hide();
                        $('#gejala').show();
                        $('#kendali').show();
                        $('#gejala').html('<h4 style="color:#28a745;">Gejala</h4><p style="color: #000;">Bercak coklat pada daun berbentuk oval yang merata di permukaan daun dengan titik engah berwarna abu-abu ata putih. Titik abu-abu ditengah bercak merupakan gejala khas penyakit bercak daun coklat di lapang. Bercak yang masih muda berwarna coklat gelap atau keunguan berbentuk bulat. Pada varietas yang peka panjang bercak dapat mencapai panjang 1cm. pada serangan berat, jamur dapat terinfeksi gabah dengan gejala bercak berwarna hitam atau coklat gelap pada gabah.</p>');
                        $('#kendali').html('<h4 style="color: #28a745;">Pengendalian</h4><p>1. Jarak tanam yang tidak terlalu rapat terutama saat musim hujan</p><p>2. Jangan gunakan urea yang berlebih dan imbangi dengan unsur K</p><p>3. Penanaman varietas tahan, seperti Ciherang dan Membrano</p><p>4. Pemupukan berimbang yang lengkap, yaitu 250 kg urea, 100 kg SP36, dan 100 kg KCl per ha</p>'); 
                        $('#result').html('<h3 style="color: #28a745;">BrownSpot</h3>');
                        console.log('Success!');
                        } 
                        else if (data == "Hispa") {
                            // Get and display the result
                        $('.loader').hide();
                        $('#result').fadeIn(600);
                        $('#btn-diseased').hide();
                        $('#tv').hide();
                        $('#result').html('<h3 style="color: #34495E;">Hispa</h3>');
                        $('#gejala').show();
                        $('#kendali').show();
                        $('#gejala').html('<h4 style="color:  #34495E;">Gejala</h4><p style="color: #000;">Kumbang dewasa makan di bagian luar epidemis atas, menyebabkan pola garis-garis putih dan pararel di sepanjang sumbu utama daun. Daun yang terserang mengering dan menghadirkan terowongan disepanjang pembuluh daun serta menyebabkan bercak putih</p>');
                        $('#kendali').html('<h4 style="color:  #34495E;">Pengendalian</h4><p>1. Tanam tanaman diawal musim untuk menghindari populasi puncak</p><p>2. Potong ujung pucuk untuk mencegah serangga bertelur</p><p>3. Singkirkan segala jenis gulma dari sawah selama musim tanpa penanaman</p><p>4. Hindari pemupukan nitrogen yang berlebihan di ladang yang terserang</p>');
                        console.log('Success!');
                        }
                    },
                });
                } else if (data == "Healthy") {
                    // Get and display the result
                $('.loader').hide();
                $('#result').fadeIn(600);
                $('#btn-diseased').hide();
                $('#tv').hide();
                $('#gejala').hide();
                $('#kendali').hide();
                $('#result').html('<h3 style="color: #28a745;">Healthy</h3>');
                $('#gejala').html('<h4 style="color:#28a745;">Alhamdulillah Tanaman Padi Anda Sehat!</h4><p style="color: #000;"> Tetap lakukan pengontrolan yang rutin untuk menjaga kualitas padi :)</p>');
                console.log('Success!');
                } 
            },
        });
    });

});